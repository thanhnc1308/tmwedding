'use server';

import { auth } from '@/auth';
import invitationResponseModel from '@/server/db/models/invitation-response.model';
import { PaginationRequest } from '@/types/pagination';
import { UserRole } from '@/types/auth';
import { getUserRoleFromEmail } from '@/utils/auth';
import { SortOrder } from 'mongoose';
import { revalidatePath } from 'next/cache';
import { escapeRegex } from './utils';

export interface InvitationResponseData {
  _id: string;
  guestId?: string;
  name: string;
  numberOfGuests: number;
  message?: string;
  createdAt: Date;
}

export interface InvitationResponsePaginationResponse {
  data: InvitationResponseData[];
  total: number;
}

const _buildFilter = (query?: string) => {
  if (!query) {
    return {};
  }

  return {
    $or: [
      { name: { $regex: escapeRegex(query), $options: 'i' } },
      { message: { $regex: escapeRegex(query), $options: 'i' } },
    ],
  };
};

const _buildSort = (sort?: string) => {
  if (!sort) {
    return { createdAt: -1 as SortOrder };
  }

  return undefined;
};

export const paginateInvitationResponses = async ({
  queryString,
  sortString,
  currentPage = 1,
  rowsPerPage = 10,
}: PaginationRequest): Promise<InvitationResponsePaginationResponse> => {
  try {
    const filter = _buildFilter(queryString);
    const sort = _buildSort(sortString);
    const skip = (currentPage - 1) * rowsPerPage;

    interface LeanResponse {
      _id: { toString(): string };
      guestId?: string;
      name: string;
      numberOfGuests: number;
      message?: string;
      createdAt: Date;
    }

    const [responses, total] = await Promise.all([
      invitationResponseModel
        .find(filter)
        .sort(sort)
        .skip(skip)
        .limit(rowsPerPage)
        .lean<LeanResponse[]>(),
      invitationResponseModel.countDocuments(filter),
    ]);

    // Convert MongoDB documents to plain objects for client components
    const data: InvitationResponseData[] = responses.map((r) => ({
      _id: r._id.toString(),
      guestId: r.guestId,
      name: r.name,
      numberOfGuests: r.numberOfGuests,
      message: r.message,
      createdAt: r.createdAt,
    }));

    return {
      total,
      data,
    };
  } catch (error) {
    console.error('paginateInvitationResponses', error);
    return {
      total: 0,
      data: [],
    };
  }
};

const listPagePath = '/admin/invitation-responses';

export const deleteInvitationResponseById = async (id: string | null) => {
  const session = await auth();
  if (
    !session?.user?.email ||
    getUserRoleFromEmail(session.user.email) !== UserRole.Admin
  ) {
    return { message: 'Unauthorized' };
  }

  if (!id) {
    return;
  }

  try {
    await invitationResponseModel.findByIdAndDelete(id);
  } catch (e) {
    console.error('deleteInvitationResponseById', e);
    return {
      message: 'Internal Server Error. Failed to Delete Response.',
    };
  }

  revalidatePath(listPagePath);
};
