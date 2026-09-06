import "../scss/styles.scss";
import { useAppContext } from "../context/AppContext";
/**
 * Component to render pagination controls for the table.
 */

type PaginationProps = {
  totalPages: number;
};

function Pagination({ totalPages }: PaginationProps) {
  const { pagination, setPagination } = useAppContext();
  const { page, pageSize } = pagination;

  const onChange = (newPage: number, newPageSize: number) => {
    setPagination((prev) => ({
      ...prev,
      page: newPage,
      pageSize: newPageSize,
    }));
  };

  return (
    <div className="pagination">
      <div className="buttons">
        <button onClick={() => onChange(1, pageSize)} disabled={page == 1}>
          First
        </button>
        <button
          onClick={() => onChange(page - 1, pageSize)}
          disabled={page <= 1}
        >
          ⬅️ Previous
        </button>
        <span className="currentPage" aria-live="polite">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => onChange(page + 1, pageSize)}
          disabled={page >= totalPages}
        >
          Next ➡️
        </button>
        <button
          onClick={() => onChange(totalPages, pageSize)}
          disabled={page == totalPages}
        >
          Last
        </button>
      </div>
      <label>
        Rows per page
        <select
          value={pageSize}
          onChange={(e) => onChange(page, Number(e.target.value))}
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
