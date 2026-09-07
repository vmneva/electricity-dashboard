import "../scss/styles.scss";
import { useState } from "react";
import { useAppContext } from "../context/AppContext";

function FilterBar() {
  const { setFiltering } = useAppContext();
  const [date, setDate] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState<boolean>(false);

  function handleApply() {
    setFiltering({
      date,
      startDate,
      endDate,
      minPrice,
      maxPrice,
    });
  }

  function handleClear() {
    setDate("");
    setStartDate("");
    setEndDate("");
    setMinPrice(null);
    setMaxPrice(null);
    setFiltering({
      date: "",
      startDate: "",
      endDate: "",
      minPrice: null,
      maxPrice: null,
    });
  }

  return (
    <div>
      <div className="btn-group">
        <button
          className="button-secondary-small"
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? "Hide filters 🔼" : "Show filters 🔽"}
        </button>
        {showFilters && (
          <button className="button-secondary-small" onClick={handleClear}>
            Clear filters
          </button>
        )}
      </div>
      {showFilters && (
        <div className="filter-panel">
          <div className="search-input">
            <label htmlFor="date">Search specific date</label>
            <input
              id="date"
              className="input"
              value={date}
              type="date"
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="date-range">
            <label htmlFor="start-date">Start Date</label>
            <input
              id="start-date"
              className="input"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <label htmlFor="end-date">End Date</label>
            <input
              id="end-date"
              className="input"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div className="price-range">
            <label htmlFor="low-price">Lowest Price</label>
            <input
              id="low-price"
              className="input"
              type="number"
              value={minPrice ?? ""}
              onChange={(e) =>
                setMinPrice(e.target.value ? Number(e.target.value) : null)
              }
            />
            <label htmlFor="high-price">Highest Price</label>
            <input
              id="high-price"
              className="input"
              type="number"
              value={maxPrice ?? ""}
              onChange={(e) =>
                setMaxPrice(e.target.value ? Number(e.target.value) : null)
              }
            />
          </div>
          <button className="button-primary-small" onClick={handleApply}>
            Apply filters
          </button>
        </div>
      )}
    </div>
  );
}

export default FilterBar;
