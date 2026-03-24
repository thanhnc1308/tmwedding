import {
  paginateInvitationResponses,
  InvitationResponseData,
} from '@/actions/invitation-response.action';
import Search from '@/components/common/table/Search';
import Table, {
  TableColumn,
  TableColumnDataType,
} from '@/components/common/table/Table';
import TableSkeletons from '@/components/common/table/TableSkeletons';
import { DeleteAction } from '@/features/invitation-responses/components/Table';
import { Suspense } from 'react';

const COLUMNS: TableColumn<InvitationResponseData>[] = [
  {
    key: 'name',
    label: 'Name',
    dataType: TableColumnDataType.String,
    sortable: true,
  },
  {
    key: 'numberOfGuests',
    label: 'Guests',
    dataType: TableColumnDataType.Number,
  },
  {
    key: 'message',
    label: 'Message',
    dataType: TableColumnDataType.String,
  },
  {
    key: 'createdAt',
    label: 'Submitted At',
    dataType: TableColumnDataType.Custom,
    getCustomCell: (row: InvitationResponseData) => {
      const date = new Date(row.createdAt);
      return (
        <span>
          {date.toLocaleDateString('vi-VN')} {date.toLocaleTimeString('vi-VN')}
        </span>
      );
    },
  },
];

export default async function InvitationResponsesPage(props: {
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

  const { data: rows, total } = await paginateInvitationResponses({
    queryString: query,
    sortString: sort,
    currentPage,
    rowsPerPage,
  });

  return (
    <div className='w-full px-5'>
      <div className='mt-4 flex items-center justify-between gap-2 md:mt-8'>
        <h1 className='text-2xl font-semibold'>Invitation Responses</h1>
        <div className='w-100'>
          <Suspense>
            <Search placeholder='Search responses...' />
          </Suspense>
        </div>
      </div>
      <Suspense key={query + currentPage} fallback={<TableSkeletons />}>
        <Table
          columns={COLUMNS}
          rows={rows}
          total={total}
          rowsPerPage={rowsPerPage}
          hasActionsColumn
          getActions={(row) => <DeleteAction id={row._id} />}
        />
      </Suspense>
    </div>
  );
}
