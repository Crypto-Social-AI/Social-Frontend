type PaginationControlsProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (currentPage: number) => void;
};

export default function PaginationControls({ currentPage, totalPages, onPageChange }: PaginationControlsProps) {
  return (
    <div>
      <button disabled={currentPage <= 1} onClick={() => onPageChange(currentPage - 1)}>
        Previous
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button disabled={currentPage >= totalPages} onClick={() => onPageChange(currentPage + 1)}>
        Next
      </button>
    </div>
  );
}
