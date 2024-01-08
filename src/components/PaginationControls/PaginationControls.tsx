import { HiChevronRight, HiChevronLeft } from 'react-icons/hi';

type PaginationControlsProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (currentPage: number) => void;
};

export default function PaginationControls({ currentPage, totalPages, onPageChange }: PaginationControlsProps) {
  return (
    <div className='my-8 flex items-center gap-1 border border-primary rounded-xl w-fit'>
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
  );
}
