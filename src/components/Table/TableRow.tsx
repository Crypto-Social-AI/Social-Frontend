import { HiChevronDown, HiChevronUp } from 'react-icons/hi2';
import { type CommonTableProps } from 'lib/types';

type TableRowProps = CommonTableProps & {
  record: any;
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
}: TableRowProps) {
  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const newExpandedRowId = record?.[idProp] === expandedRowId ? null : record?.[idProp];
    if (setExpandedRowId) {
      setExpandedRowId(newExpandedRowId);
    }
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
