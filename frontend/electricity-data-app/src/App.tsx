import "./scss/styles.scss";
import "./App.scss";
import { useState } from "react";
import { useAppContext } from "./context/AppContext";
import { useDailyData } from "./hooks/useDailyData";
import type { components } from "./api/schema";
import DataTable from "./components/DataTable";
import Pagination from "./components/Pagination";
import FilterBar from "./components/FilterBar";
import SingleDayDetail from "./components/SingleDayDetail";

function App() {
  const { pagination, sorting, filtering } = useAppContext();
  const [dateSelected, setDateSelected] = useState<
    components["schemas"]["DailyData"]["date"] | null
  >(null);

  const { data, isLoading, isFetching, error } = useDailyData({
    pagination,
    sort: sorting,
    filters: filtering,
  });

  return (
    <div className="mainview">
      <h1>Electricity Data Dashboard</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading data</p>}
      {data && (
        <div className={isFetching ? "is-updating" : "contents"}>
          <FilterBar />
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
