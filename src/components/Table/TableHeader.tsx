import { type SortConfig } from 'lib/types';
import { HiChevronDown, HiChevronUp, HiChevronUpDown } from 'react-icons/hi2';
// import { AiOutlineInfoCircle } from 'react-icons/ai';
// import useTranslate from 'translate/useTranslate';
// import Tooltip from 'components/Tooltip/Tooltip';

type TableHeaderProps = {
  records: any;
  handleSortClick?: (sortKey: string) => any;
  sortConfig?: SortConfig;
  uncommonTokenSymbol: string;
  isExpandable: boolean;
};

function TableHeader({ records, handleSortClick, sortConfig, uncommonTokenSymbol, isExpandable }: TableHeaderProps) {
  // const trans = useTranslate();

  function getSortIcon(columnId: string, config: SortConfig) {
    if (config !== undefined && config.key === columnId) {
      if (config.direction === 'asc') {
        return <HiChevronDown />;
      }
      return <HiChevronUp />;
    }
    return <HiChevronUpDown />;
  }

  return (
    <thead className='text-text-primary sticky top-0 z-[1] border-b border-secondary'>
      <tr className='bg-primary'>
        {isExpandable && <th className=''> </th>}
        {records.map((record: any) => {
          const columnId = record.sortKey ?? record?.id;
          const sortIcon = sortConfig ? getSortIcon(columnId, sortConfig) : <HiChevronUpDown />;

          return (
            <th
              key={record.id}
              className={`${record?.headerClassName} p-6`}
              onClick={
                record?.sortKey ?? record?.showSort
                  ? () => {
                      if (handleSortClick) {
                        handleSortClick(record.sortKey ?? record.id);
                      }
                    }
                  : undefined
              }
            >
              {record?.header !== undefined && (
                <div
                  className={`flex gap-1 items-center ${record?.showSort || record?.sortKey ? 'cursor-pointer' : ''}`}
                >
                  <span className='text-2xl'>
                    {typeof record.header === 'function' ? record.header() : record.header}
                  </span>
                  {record?.showSort || (record?.sortKey && <span>{sortIcon}</span>)}

                  {/* {record.tooltipText && (
                    <Tooltip content={record.tooltipText}>
                      <div>
                        <AiOutlineInfoCircle size={13} className='cursor-pointer' />
                      </div>
                    </Tooltip>
                  )} */}
                </div>
              )}
            </th>
          );
        })}
      </tr>
    </thead>
  );
}

export default TableHeader;
