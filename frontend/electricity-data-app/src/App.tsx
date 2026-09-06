import { useAppContext } from "./context/AppContext";
import DataTable from "./components/DataTable";
import Pagination from "./components/Pagination";
import "./scss/styles.scss";
import "./App.scss";
import { useDailyData } from "./hooks/useDailyData";
import FilterBar from "./components/FilterBar";
import { useState } from "react";

function App() {
  const { pagination } = useAppContext();
  const [searchDate, setSearchDate] = useState("");

  const { data, isLoading, isFetching, error } = useDailyData(
    pagination,
    searchDate,
  );

  function onSearchClick(date: string) {
    setSearchDate(date);
  }

  return (
    <div className="mainview">
      <h1>Electricity Data Dashboard</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading data</p>}
      {data && (
        <div className={isFetching ? "is-updating" : "contents"}>
          <FilterBar onClick={onSearchClick} />
          <DataTable dayData={data.data} />
          <Pagination totalPages={data.totalPages} />
        </div>
      )}
    </div>
  );
}
export default App;
