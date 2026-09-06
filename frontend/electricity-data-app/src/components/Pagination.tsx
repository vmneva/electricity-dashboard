import "../scss/styles.scss";
/**
 * Component to render pagination controls for the table.
 */

type PaginationProps = {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  itemsOnCurrentPage: number;
  onPageChange: (newPage: number) => void;
  onPageSizeChange: (newPageSize: number) => void;
};

function Pagination({
  pageNumber,
  pageSize,
  totalPages,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) {
  return (
    <div className="pagination">
      <div className="buttons">
        <button onClick={() => onPageChange(1)} disabled={pageNumber == 1}>
          First
        </button>
        <button
          onClick={() => onPageChange(pageNumber - 1)}
          disabled={pageNumber <= 1}
        >
          ⬅️ Previous
        </button>
        <span className="currentPage" aria-live="polite">
          Page {pageNumber} of {totalPages}
        </span>
        <button
          onClick={() => onPageChange(pageNumber + 1)}
          disabled={pageNumber >= totalPages}
        >
          Next ➡️
        </button>
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={pageNumber == totalPages}
        >
          Last
        </button>
      </div>
      <label>
        Rows per page
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
        </select>
      </label>
    </div>
  );
}

export default Pagination;
