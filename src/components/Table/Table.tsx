import { useState } from 'react';
import clsx from 'clsx';
// import Spinner from 'components/Loaders/Spinner';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import { type CommonTableProps, type SortConfig } from '../../lib/types';

type TableProps = CommonTableProps & {
  loading?: boolean;
  className?: string;
  handleSortClick?: (sortKey: string) => any;
  showHeader?: boolean;
  displayedData: any;
  sortConfig?: SortConfig;
  showTotalRecordsInfo?: boolean;
  uncommonToken?: any;
  dataSrc: any;
  handleScroll?: (e: React.UIEvent<HTMLElement>) => void;
};

function Table({
  loading,
  className,
  displayedData,
  clickableRows,
  handleColClick,
  renderExpandedContent,
  handleSortClick,
  showTotalRecordsInfo,
  uncommonToken,
  dataSrc,
  renderedRecords,
  sortConfig,
  showHeader = true,
  handleScroll = () => {},
  idProp = '_id',
  isExpandable = false,
}: TableProps) {
  const hasData = dataSrc && dataSrc.length > 0;
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);

  return (
    <div>
      {loading && <span>Loading...</span>}
      <div
        onScroll={handleScroll}
        className={clsx('mx-auto w-full overflow-x-auto rounded-md', className, {
          'border border-secondary': !loading,
        })}
      >
        {hasData ? (
          <table className='w-full rounded-md text-xl text-left text-text-primary whitespace-nowrap'>
            {showHeader && (
              <TableHeader
                uncommonTokenSymbol={uncommonToken?.symbol}
                records={renderedRecords}
                handleSortClick={handleSortClick}
                sortConfig={sortConfig}
                isExpandable={isExpandable}
              />
            )}
            <TableBody
              idProp={idProp}
              displayedData={displayedData}
              clickableRows={clickableRows}
              handleColClick={handleColClick}
              renderedRecords={renderedRecords}
              isExpandable={isExpandable}
              expandedRowId={expandedRowId}
              setExpandedRowId={setExpandedRowId}
              renderExpandedContent={renderExpandedContent}
            />
          </table>
        ) : (
          <>
            {!loading && !hasData && (
              <div className='flex justify-center items-center h-full'>
                <span className='text-3xl text-text-primary'>No records found.</span>
              </div>
            )}
          </>
        )}
      </div>
      {showTotalRecordsInfo && (
        <span className='text-2xl flex justify-end mt-2 px-6 py-4'>
          {uncommonToken?.symbol} (showing last {displayedData?.length} of {dataSrc?.length})
        </span>
      )}
    </div>
  );
}

export default Table;
