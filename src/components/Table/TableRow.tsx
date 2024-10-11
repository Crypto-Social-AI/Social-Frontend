import { type CommonTableProps } from 'lib/types';
import { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa6'; // Outlined star icon
import { HiChevronDown, HiChevronUp, HiStar } from 'react-icons/hi2';

type TableRowProps = CommonTableProps & {
  record: any;
  onWatchlistToggle: (username: string) => void; // Required
  isInWatchlist: (username: string) => boolean; // Required
};

function TableRow({
  record,
  clickableRows,
  handleColClick,
  renderedRecords,
  idProp,
  isExpandable,
  expandedRowId,
  setExpandedRowId,
  renderExpandedContent,
  onWatchlistToggle, 
  isInWatchlist, 
}: TableRowProps) {
  const [inWatchlist, setInWatchlist] = useState(isInWatchlist(record.username)); // Local state for watchlist status

  // Update local state when the record's watchlist status changes
  useEffect(() => {
    setInWatchlist(isInWatchlist(record.username));
  }, [record.username, isInWatchlist]); // Rerun effect when username changes or isInWatchlist function changes

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const newExpandedRowId = record?.[idProp] === expandedRowId ? null : record?.[idProp];
    if (setExpandedRowId) {
      setExpandedRowId(newExpandedRowId);
    }
  };

  const handleWatchlistToggle = (username: string) => {
    onWatchlistToggle(username);
    setInWatchlist(!inWatchlist); 
  };

  return (
    <>
      <tr
        className={`border-b w-full ${
          record?.[idProp] === expandedRowId
            ? 'bg-secondary border-b border-contrast'
            : 'bg-background border-secondary'
        } ${clickableRows ? 'hover:bg-contrast cursor-pointer transition-all duration-200' : ''}`}
        onClick={clickableRows && handleColClick ? (e) => handleColClick(e, record) : undefined}
      >
        {/* Chevron for expand/collapse */}
        {isExpandable && (
          <td className='pl-6 py-4 w-0'>
            <button type='button' onClick={(e) => handleToggle(e)}>
              {record?.[idProp] === expandedRowId ? (
                <HiChevronUp className='cursor-pointer' size={20} />
              ) : (
                <HiChevronDown className='cursor-pointer' size={20} />
              )}
            </button>
          </td>
        )}

        {renderedRecords.map((recordItem: any) => (
          <td key={recordItem.id} className='px-6 py-4'>
            {recordItem.render(record, record[recordItem.id])}

            {/* Watchlist Star Icon */}
            {recordItem.id === 'watchlist' && (
              <button onClick={() => handleWatchlistToggle(record.username)} className='flex items-center'>
                {inWatchlist ? ( // Use local state for rendering
                  <HiStar className='text-yellow-500' />
                ) : (
                  <FaStar className='text-gray-500' />
                )}
              </button>
            )}
          </td>
        ))}
      </tr>

      {/* Expanded content */}
      {isExpandable && record?.[idProp] === expandedRowId && renderExpandedContent && (
        <tr className='bg-secondary border-b border-secondary'>
          <td colSpan={renderedRecords.length + 1}>{renderExpandedContent(record)}</td>
        </tr>
      )}
    </>
  );
}

export default TableRow;
