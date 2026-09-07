import "../scss/styles.scss";
import { useAppContext } from "../context/AppContext";
import type { components } from "../api/schema";

type PaginationProps = {
  totalPages: number;
};

function Pagination({ totalPages }: PaginationProps) {
  const { pagination, setPagination } = useAppContext();
  const pageNumber = Number(pagination.pageNumber);
  const pageSize = Number(pagination.pageSize);

  const onChange = (newPagination: components["schemas"]["Pagination"]) => {
    setPagination((prev) => ({
      ...prev,
      pageNumber: newPagination.pageNumber,
      pageSize: newPagination.pageSize,
    }));
  };

  return (
    <div className="pagination">
      <div className="btn-group">
        <button
          className="button-secondary-small"
          onClick={() => onChange({ pageNumber: 1, pageSize })}
          disabled={pageNumber == 1}
        >
          First
        </button>
        <button
          className="button-secondary-small"
          onClick={() =>
            onChange({
              pageNumber: pageNumber - 1,
              pageSize,
            })
          }
          disabled={pageNumber <= 1}
        >
          ⬅️ Previous
        </button>
        <span className="currentPage" aria-live="polite">
          Page {pageNumber} of {totalPages}
        </span>
        <button
          className="button-secondary-small"
          onClick={() =>
            onChange({
              pageNumber: pageNumber + 1,
              pageSize,
            })
          }
          disabled={pageNumber >= totalPages}
        >
          Next ➡️
        </button>
        <button
          className="button-secondary-small"
          onClick={() => onChange({ pageNumber: totalPages, pageSize })}
          disabled={pageNumber == totalPages}
        >
          Last
        </button>
      </div>
      <label>
        Rows per page
        <select
          value={pageSize}
          onChange={(e) =>
            onChange({
              pageNumber: pageNumber,
              pageSize: Number(e.target.value),
            })
          }
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
