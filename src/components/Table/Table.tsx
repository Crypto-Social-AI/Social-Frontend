import clsx from 'clsx';
import { type CommonTableProps, type SortConfig } from 'lib/types';
import { useState } from 'react';
import EmptyRecordsBox from './EmptyRecordsBox';
import TableBody from './TableBody';
import TableHeader from './TableHeader';

type TableProps<K extends keyof any> = CommonTableProps & {
  loading?: boolean;
  className?: string;
  handleSortClick?: (sortKey: string) => any;
  showHeader?: boolean;
  displayedData: any;
  sortConfig?: SortConfig<K> | null;
  onWatchlistToggle?: (username: string) => void;
  isInWatchList?: (username: string) => boolean;
  showTotalRecordsInfo?: boolean;
  uncommonToken?: any;
  dataSrc: any;
  handleScroll?: (e: React.UIEvent<HTMLElement>) => void;
};

function Table<K extends keyof any>({
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
  onWatchlistToggle = () => {}, // Provide default
  isInWatchList = () => false, // Provide default
  showHeader = true,
  handleScroll = () => {},
  idProp = '_id',
  isExpandable = false,
}: TableProps<K>) {
  const hasData = dataSrc && dataSrc.length > 0;
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);

  return (
    <>
      <div
        onScroll={handleScroll}
        className={clsx('mx-auto w-full overflow-x-auto rounded-md border border-secondary', className)}
      >
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
            loading={loading}
            displayedData={displayedData}
            clickableRows={clickableRows}
            handleColClick={handleColClick}
            renderedRecords={renderedRecords}
            isExpandable={isExpandable}
            expandedRowId={expandedRowId}
            setExpandedRowId={setExpandedRowId}
            renderExpandedContent={renderExpandedContent}
            onWatchlistToggle={onWatchlistToggle} 
            isInWatchlist={isInWatchList} 
          />
        </table>
        {!loading && !hasData && <EmptyRecordsBox />}
      </div>
      {showTotalRecordsInfo && (
        <span className='text-2xl flex justify-end mt-2 px-6 py-4'>
          {uncommonToken?.symbol} (showing last {displayedData?.length} of {dataSrc?.length})
        </span>
      )}
    </>
  );
}

export default Table;
