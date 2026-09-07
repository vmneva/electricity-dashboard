import { useState } from "react";
import { useAppContext } from "./context/AppContext";
import DataTable from "./components/DataTable";
import Pagination from "./components/Pagination";
import FilterBar from "./components/FilterBar";
import SingleDayDetail from "./components/SingleDayDetail";
import "./scss/styles.scss";
import "./App.scss";
import { useDailyData } from "./hooks/useDailyData";
import type { components } from "./api/schema";

function App() {
  const { pagination } = useAppContext();
  const [searchDate, setSearchDate] = useState("");
  const [dateSelected, setDateSelected] = useState<
    components["schemas"]["DailyData"]["date"] | null
  >(null);

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
          {dateSelected && (
            <SingleDayDetail
              date={dateSelected}
              onClose={() => setDateSelected(null)}
            />
          )}
          <DataTable
            dayData={data.dailyRows as components["schemas"]["DailyData"][]}
            setDateSelected={setDateSelected}
          />
          <Pagination totalPages={data.allPages as number} />
        </div>
      )}
    </div>
  );
}
export default App;
