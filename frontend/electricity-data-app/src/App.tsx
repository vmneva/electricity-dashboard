import { useAppContext } from "./context/AppContext";
import DataTable from "./components/DataTable";
import Pagination from "./components/Pagination";
import "./scss/styles.scss";
import "./App.scss";
import { useDailyData } from "./hooks/useDailyData";

function App() {
  const { pagination } = useAppContext();
  const {
    data,
    isLoading: isListLoading,
    isFetching: isListFetching,
    error: listError,
  } = useDailyData(pagination);

  return (
    <div className="mainview">
      <h1>Electricity Data Dashboard</h1>
      {isListLoading && <p>Loading...</p>}
      {listError && <p>Error loading data</p>}
      {data && (
        <div className={isListFetching ? "is-updating" : undefined}>
          <DataTable dayData={data.data} />
          <Pagination totalPages={data.totalPages} />
        </div>
      )}
    </div>
  );
}
export default App;
