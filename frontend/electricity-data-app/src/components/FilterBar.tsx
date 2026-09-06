import { useState } from "react";
import "../scss/styles.scss";
/*
  Filter bar component containing options to
    - search by date
    - filter by date range
*/

type Props = {
  onClick: (date: string) => void;
};

function FilterBar({ onClick }: Props) {
  const [date, setDate] = useState<string>("");
  const [showFilters, setShowFilters] = useState<boolean>(false);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setDate(e.target.value);
  }

  function toggleFilters() {
    setShowFilters(!showFilters);
  }

  return (
    <div>
      <div className="btn-group">
        <button className="button-secondary-small" onClick={toggleFilters}>
          {showFilters ? "Hide filters 🔼" : "Show filters 🔽"}
        </button>
        {showFilters && (
          <>
            <button
              className="button-primary-small"
              onClick={() => onClick(date)}
            >
              Apply filters
            </button>
            <button
              className="button-secondary-small"
              onClick={() => onClick("")}
            >
              Clear filters
            </button>
          </>
        )}
      </div>
      {showFilters && (
        <div>
          <div className="search-input">
            <label htmlFor="date">Search specific date</label>
            <input
              id="date"
              className="input"
              value={date}
              type="date"
              onChange={handleInputChange}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default FilterBar;
