import { paginateGuestList } from '@/actions/guest.action';
import Search from '@/components/common/table/Search';
import Table, {
  TableColumn,
  TableColumnDataType,
} from '@/components/common/table/Table';
import TableSkeletons from '@/components/common/table/TableSkeletons';
import ClearGuestList from '@/features/guest-list/components/ClearGuestList';
import GuestImport from '@/features/guest-list/components/GuestImport';
import {
  DeleteAction,
  Status,
  UpdateAction,
  ViewInvitationAction,
} from '@/features/guest-list/components/Table';
import { ToggleInvitedAction } from '@/features/guest-list/components/ToggleInvitedAction';

import {
  Guest,
  GuestConfirmationStatus,
  GuestAgeComparison,
  GuestGender,
  GuestSource,
} from '@/types/guest';
import { PlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Suspense } from 'react';

const GUEST_LIST_COLUMNS: TableColumn<Guest>[] = [
  {
    key: 'name',
    label: 'Name',
    dataType: TableColumnDataType.String,
    sortable: true,
  },
  {
    key: 'status',
    label: 'Status',
    dataType: TableColumnDataType.Custom,
    getCustomCell: (guest: Guest) => {
      return <Status status={guest.status} />;
    },
    filterable: true,
    filterOptions: [
      GuestConfirmationStatus.Pending,
      GuestConfirmationStatus.Accepted,
      GuestConfirmationStatus.Declined,
    ],
  },
  {
    key: 'memberCount',
    label: 'Member Count',
    dataType: TableColumnDataType.Number,
  },
  {
    key: 'invited',
    label: 'Invited',
    dataType: TableColumnDataType.Boolean,
    filterable: true,
  },
  {
    key: 'guestSource',
    label: 'Guest Source',
    dataType: TableColumnDataType.String,
    filterable: true,
    filterOptions: [GuestSource.Groom, GuestSource.Bride],
  },
  {
    key: 'ageComparison',
    label: 'Age',
    dataType: TableColumnDataType.String,
    filterable: true,
    filterOptions: [
      GuestAgeComparison.Older,
      GuestAgeComparison.Younger,
      GuestAgeComparison.Same,
    ],
  },
  {
    key: 'gender',
    label: 'Gender',
    dataType: TableColumnDataType.String,
    filterable: true,
    filterOptions: [GuestGender.Male, GuestGender.Female],
  },
];

export default async function GuestListPage(props: {
  // https://nextjs.org/docs/app/api-reference/file-conventions/page
  searchParams?: Promise<{
    query?: string;
    sort?: string;
    page?: string;
    rowsPerPage?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const sort = searchParams?.sort || '';
  const currentPage = Number(searchParams?.page) || 1;
  const rowsPerPage = Number(searchParams?.rowsPerPage) || 10;

  const {
    data: rows,
    total,
    groomMemberCount,
    brideMemberCount,
  } = await paginateGuestList({
    queryString: query,
    sortString: sort,
    currentPage,
    rowsPerPage,
  });

  return (
    <div className='w-full px-5'>
      <div className='mt-4 flex items-center gap-4 text-sm text-gray-600 md:mt-8'>
        <span>Groom: {groomMemberCount}</span>
        <span>Bride: {brideMemberCount}</span>
      </div>
      <div className='mt-2 flex items-center justify-end gap-2'>
        <div className='w-100'>
          <Suspense>
            <Search placeholder='Search guest...' />
          </Suspense>
        </div>
        <GuestImport />
        <ClearGuestList />
        <Link
          href='/admin/guest-list/add'
          className='flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
        >
          <span className='hidden md:block'>Add</span>{' '}
          <PlusIcon className='h-5 md:ml-4' />
        </Link>
      </div>
      <Suspense key={query + currentPage} fallback={<TableSkeletons />}>
        <Table
          columns={GUEST_LIST_COLUMNS}
          rows={rows}
          total={total}
          rowsPerPage={rowsPerPage}
          hasActionsColumn
          getActions={(guest) => (
            <>
              <ToggleInvitedAction id={guest._id} invited={guest.invited} />
              <UpdateAction id={guest._id} />
              <DeleteAction id={guest._id} />
              <ViewInvitationAction id={guest._id} />
            </>
          )}
        />
      </Suspense>
    </div>
  );
}
