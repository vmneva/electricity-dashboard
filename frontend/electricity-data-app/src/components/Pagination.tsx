import "../scss/styles.scss";
import { useContext } from "react";
import AppContext from "../AppContext";
/**
 * Component to render pagination controls for the table.
 */

type PaginationProps = {
  totalPages: number;
  itemsOnCurrentPage: number;
  onPageChange: (newPage: number) => void;
  onPageSizeChange: (newPageSize: number) => void;
};

function Pagination({
  totalPages,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) {
  const { page, pageSize } = useContext(AppContext);

  return (
    <div className="pagination">
      <div className="buttons">
        <button onClick={() => onPageChange(1)} disabled={page == 1}>
          First
        </button>
        <button onClick={() => onPageChange(page - 1)} disabled={page <= 1}>
          ⬅️ Previous
        </button>
        <span className="currentPage" aria-live="polite">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
        >
          Next ➡️
        </button>
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={page == totalPages}
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
