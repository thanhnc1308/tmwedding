import CheckboxCell from './CheckboxCell';
import Pagination from './Pagination';

export enum TableColumnDataType {
  String = 'string',
  Boolean = 'boolean',
  Number = 'number',
  Custom = 'custom',
}

type BaseRow = { _id: string };

export type TableColumn<T = unknown> = {
  key: keyof T & string;
  label: string;
  dataType: TableColumnDataType;
  getCustomCell?: (row: T, column: TableColumn<T>) => React.ReactNode;
  filterable?: boolean;
  sortable?: boolean;
  filterOptions?: string[];
};

export default async function Table<T extends BaseRow>({
  columns,
  rows,
  total,
  rowsPerPage,
  hasActionsColumn,
  getActions,
}: {
  columns: TableColumn<T>[];
  rows: T[];
  total: number;
  rowsPerPage: number;
  hasActionsColumn: boolean;
  getActions?: (row: T) => React.ReactNode;
}) {
  const totalPage = Math.ceil(total / rowsPerPage);

  return (
    <div className='mt-6 flow-root'>
      <div className='inline-block min-w-full align-middle'>
        <div className='rounded-lg bg-gray-50 p-2 md:pt-0'>
          <table className='hidden min-w-full text-gray-900 md:table'>
            <thead className='rounded-lg text-left text-sm font-normal'>
              <tr>
                {columns.map((column) => {
                  return (
                    <th
                      key={column.key}
                      scope='col'
                      className='px-3 py-5 font-medium'
                    >
                      <div className='flex items-center'>
                        {column.label}

                        {column.filterable && (
                          <>
                            <button
                              type='button'
                              className='ml-2 cursor-pointer'
                              aria-label='Filter'
                            >
                              <svg
                                className='h-4 w-4'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                              >
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth='2'
                                  d='M4 6h16M4 12h16M4 18h16'
                                />
                              </svg>
                            </button>
                            <div className='filter-options hidden'>
                              <select name='filter' id='filter' multiple>
                                {column.filterOptions?.map((option) => (
                                  <option key={option} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </>
                        )}

                        {column.sortable && (
                          <button
                            type='button'
                            className='ml-2 cursor-pointer'
                            aria-label='Sort'
                          >
                            <svg
                              className='h-4 w-4'
                              fill='none'
                              viewBox='0 0 24 24'
                              stroke='currentColor'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M5 15l7-7 7 7'
                              />
                            </svg>
                          </button>
                        )}
                      </div>
                    </th>
                  );
                })}
                {hasActionsColumn && (
                  <th scope='col' className='px-3 py-3'>
                    <span className='sr-only'>Actons</span>
                  </th>
                )}
              </tr>
            </thead>
            <tbody className='bg-white'>
              {rows?.map((row) => (
                <tr
                  key={row._id}
                  className='w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg'
                >
                  {columns.map((column) => {
                    // type custom
                    if (column.dataType === TableColumnDataType.Custom) {
                      return (
                        <td
                          key={column.key}
                          className='whitespace-nowrap px-3 py-3'
                        >
                          {!!column.getCustomCell &&
                            column.getCustomCell(row, column)}
                        </td>
                      );
                    }

                    // type boolean
                    if (column.dataType === TableColumnDataType.Boolean) {
                      return (
                        <td
                          key={column.key}
                          className='whitespace-nowrap px-3 py-3'
                        >
                          <CheckboxCell
                            checked={row[column.key] as boolean}
                          />
                        </td>
                      );
                    }

                    // type number
                    if (column.dataType === TableColumnDataType.Number) {
                      return (
                        <td
                          key={column.key}
                          className='whitespace-nowrap px-3 py-3'
                        >
                          {row[column.key] as React.ReactNode}
                        </td>
                      );
                    }

                    // type string
                    return (
                      <td
                        key={column.key}
                        className='whitespace-nowrap px-3 py-3'
                      >
                        {row[column.key] as React.ReactNode}
                      </td>
                    );
                  })}
                  {hasActionsColumn && (
                    <td className='whitespace-nowrap px-3 py-3'>
                      <div className='flex justify-end gap-3'>
                        {!!getActions && getActions(row)}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className='mt-5 flex w-full justify-end'>
        <Pagination totalPage={totalPage} />
      </div>
    </div>
  );
}
