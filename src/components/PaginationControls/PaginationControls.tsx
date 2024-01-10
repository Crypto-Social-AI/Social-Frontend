import { HiChevronRight, HiChevronLeft } from 'react-icons/hi';
import { HiChevronDown } from 'react-icons/hi2';

type PaginationControlsProps = {
  currentPage: number;
  totalPages: number;
  showItemsPerPage?: boolean;
  onPageChange: (currentPage: number) => void;
  onItemsPerPageChange: (newLimit: number) => void;
};

export default function PaginationControls({
  currentPage,
  totalPages,
  onPageChange,
  onItemsPerPageChange,
  showItemsPerPage = true,
}: PaginationControlsProps) {
  return (
    <div className='mt-6 flex flex-row-reverse justify-between items-center'>
      <div className='flex items-center gap-1 border border-primary rounded-xl w-fit'>
        <button
          className='flex items-center border-r border-primary hover:bg-secondary transition-all duration-150 rounded-l-xl'
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <HiChevronLeft size={24} />
        </button>
        <span className='text-2xl px-4'>
          {currentPage} of {totalPages}
        </span>
        <button
          className='flex items-center border-l border-primary hover:bg-secondary transition-all duration-150 rounded-r-xl'
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <HiChevronRight size={24} />
        </button>
      </div>
      {showItemsPerPage ? (
        <div className='flex items-center gap-3'>
          <span className='text-xl'>Items per page</span>
          <div className='relative inline-block'>
            <select
              className='block appearance-none bg-background w-full text-white py-2 pl-4 pr-8 rounded leading-tight focus:outline-none focus:border-blue-500 border border-primary cursor-pointer'
              name='limitPerPage'
              id='limitPerPage'
              onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            >
              <option value='20'>20</option>
              <option value='50'>50</option>
              <option value='100'>100</option>
            </select>
            <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2'>
              <HiChevronDown />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
