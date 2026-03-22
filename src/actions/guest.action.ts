'use server';

import { auth } from '@/auth';
import guestModel from '@/server/db/models/guest.model';
import {
  Guest,
  GuestListPaginationResponse,
  GuestConfirmationStatus,
  GuestSource,
  GuestAgeComparison,
  GuestGender,
} from '@/types/guest';
import { PaginationRequest } from '@/types/pagination';
import { UserRole } from '@/types/auth';
import { hash } from '@/utils';
import { getUserRoleFromEmail } from '@/utils/auth';
import { SortOrder } from 'mongoose';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { escapeRegex } from './utils';

const _buildFilter = (query?: string) => {
  if (!query) {
    return {};
  }

  return {
    name: { $regex: escapeRegex(query), $options: 'i' },
  };
};

const requireAdmin = async () => {
  const session = await auth();
  if (
    !session?.user?.email ||
    getUserRoleFromEmail(session.user.email) !== UserRole.Admin
  ) {
    throw new Error('Unauthorized');
  }
};

const _buildSort = (sort?: string) => {
  if (!sort) {
    return { name: 1 as SortOrder };
  }

  // TODO
  return undefined;
};

interface LeanGuest {
  _id: string;
  name: string;
  status: string;
  memberCount: number;
  invited: boolean;
  guestSource: string;
  ageComparison: string;
  gender?: string;
}

const paginateGuestList = async ({
  queryString,
  sortString,
  currentPage = 1,
  rowsPerPage = 10,
}: PaginationRequest): Promise<GuestListPaginationResponse> => {
  try {
    const filter = _buildFilter(queryString);
    const sort = _buildSort(sortString);
    const skip = (currentPage - 1) * rowsPerPage;

    const [guests, total, memberCountResult] = await Promise.all([
      guestModel
        .find(filter)
        .sort(sort)
        .skip(skip)
        .limit(rowsPerPage)
        .lean<LeanGuest[]>(),
      guestModel.countDocuments(filter).exec(),
      guestModel.aggregate([
        { $match: filter },
        { $group: { _id: '$guestSource', total: { $sum: '$memberCount' } } },
      ]),
    ]);
    const memberCountBySource: Record<string, number> = {};
    for (const entry of memberCountResult) {
      memberCountBySource[entry._id] = entry.total;
    }
    const groomMemberCount = memberCountBySource[GuestSource.Groom] ?? 0;
    const brideMemberCount = memberCountBySource[GuestSource.Bride] ?? 0;

    // Convert to plain objects for client components with defaults for missing fields
    const data: Guest[] = guests.map((g) => ({
      _id: g._id,
      name: g.name,
      status:
        (g.status as GuestConfirmationStatus) ||
        GuestConfirmationStatus.Pending,
      memberCount: g.memberCount || 1,
      invited: g.invited ?? false,
      guestSource: (g.guestSource as GuestSource) || GuestSource.Groom,
      ageComparison:
        (g.ageComparison as GuestAgeComparison) || GuestAgeComparison.Same,
      gender: g.gender as GuestGender | undefined,
    }));

    return {
      total,
      groomMemberCount,
      brideMemberCount,
      data,
    };
  } catch (error) {
    console.error('paginateGuestList', error);
    return {
      total: 0,
      groomMemberCount: 0,
      brideMemberCount: 0,
      data: [],
    };
  }
};

const fetchGuestById = async (guestId: string): Promise<Guest | null> => {
  const _guest = await guestModel
    .findById(guestId)
    .lean<Partial<LeanGuest>>()
    .exec();

  if (!_guest) {
    return null;
  }

  // Convert to plain object for client components with defaults for missing fields
  return {
    _id: _guest._id || '',
    name: _guest.name || '',
    status:
      (_guest.status as GuestConfirmationStatus) ||
      GuestConfirmationStatus.Pending,
    memberCount: _guest.memberCount || 1,
    invited: _guest.invited ?? false,
    guestSource: (_guest.guestSource as GuestSource) || GuestSource.Groom,
    ageComparison:
      (_guest.ageComparison as GuestAgeComparison) || GuestAgeComparison.Same,
    gender: _guest.gender as GuestGender | undefined,
  };
};

export type GuestState = {
  errors?: {
    name?: string[];
    memberCount?: string[];
    status?: string[];
    invited?: string[];
    guestSource?: string[];
    ageComparison?: string[];
    gender?: string[];
  };
  message?: string | null;
};

const GuestSchema = z.object({
  _id: z.string(),
  name: z.string({
    invalid_type_error: 'Name must be a string.',
    required_error: 'Name is required.',
  }),
  memberCount: z.coerce.number({
    invalid_type_error: 'Member Count must be a number.',
    required_error: 'Member Count is required.',
  }),
  status: z.enum([
    GuestConfirmationStatus.Accepted,
    GuestConfirmationStatus.Pending,
    GuestConfirmationStatus.Declined,
  ]),
  invited: z.boolean(),
  guestSource: z.enum([GuestSource.Groom, GuestSource.Bride]),
  ageComparison: z.enum([
    GuestAgeComparison.Older,
    GuestAgeComparison.Younger,
    GuestAgeComparison.Same,
  ]),
  gender: z
    .enum([GuestGender.Male, GuestGender.Female])
    .optional()
    .or(z.literal('')),
});
const CreateGuestSchema = GuestSchema.omit({ _id: true });
const UpdateGuestSchema = GuestSchema.omit({ _id: true });

const listPagePath = '/admin/guest-list';

const generateGuestId = (guest: Guest) => {
  return hash(`${guest.guestSource}-${guest.name}`);
};

const createGuest = async (prevState: GuestState, formData: FormData) => {
  await requireAdmin();

  const validatedFields = CreateGuestSchema.safeParse({
    name: formData.get('name'),
    memberCount: formData.get('memberCount'),
    status: formData.get('status'),
    invited: !!formData.get('invited'),
    guestSource: formData.get('guestSource'),
    ageComparison: formData.get('ageComparison'),
    gender: formData.get('gender') || undefined,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Guest.',
    };
  }

  try {
    await guestModel.create({
      _id: generateGuestId(validatedFields.data as Guest),
      ...validatedFields.data,
    });
  } catch (e) {
    console.error('createGuest', e);
    return {
      message: 'Internal Server Error. Failed to Create Guest.',
    };
  }

  revalidatePath(listPagePath);
  redirect(listPagePath);
};

const updateGuestById = async (
  guestId: string,
  prevState: GuestState,
  formData: FormData,
) => {
  await requireAdmin();

  const validatedFields = UpdateGuestSchema.safeParse({
    name: formData.get('name'),
    memberCount: formData.get('memberCount'),
    status: formData.get('status'),
    invited: !!formData.get('invited'),
    guestSource: formData.get('guestSource'),
    ageComparison: formData.get('ageComparison'),
    gender: formData.get('gender') || undefined,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Guest.',
    };
  }

  try {
    await guestModel.findByIdAndUpdate(guestId, validatedFields.data);
  } catch (e) {
    console.error('updateGuestById', e);
    return {
      message: 'Internal Server Error. Failed to Update Guest.',
    };
  }

  revalidatePath(listPagePath);
  redirect(listPagePath);
};

const toggleGuestInvited = async (guestId: string) => {
  await requireAdmin();

  try {
    const guest = await guestModel.findById(guestId).exec();
    if (!guest) {
      return { message: 'Guest not found.' };
    }
    guest.invited = !guest.invited;
    await guest.save();
  } catch (e) {
    console.error('toggleGuestInvited', e);
    return {
      message: 'Internal Server Error. Failed to toggle invited status.',
    };
  }

  revalidatePath(listPagePath);
};

const clearGuestList = async () => {
  await requireAdmin();

  try {
    await guestModel.deleteMany({});
  } catch (e) {
    console.error('clearGuestList', e);
    return {
      message: 'Internal Server Error. Failed to clear guest list.',
    };
  }

  revalidatePath(listPagePath);
};

const deleteGuestById = async (guestId: string | null) => {
  await requireAdmin();

  if (!guestId) {
    return;
  }

  try {
    await guestModel.findByIdAndDelete(guestId);
  } catch (e) {
    console.error('deleteGuestById', e);
    return {
      message: 'Internal Server Error. Failed to Delete Guest.',
    };
  }

  revalidatePath(listPagePath);
  redirect(listPagePath);
};

export {
  paginateGuestList,
  fetchGuestById,
  createGuest,
  updateGuestById,
  deleteGuestById,
  clearGuestList,
  toggleGuestInvited,
};
