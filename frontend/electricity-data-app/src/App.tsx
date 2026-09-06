import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getDailyDataAsync } from "./api/electricityData";
import DataTable from "./components/DataTable";
import Pagination from "./components/Pagination";
import "./scss/styles.scss";
import "./App.scss";

function App() {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const { data, isLoading, error } = useQuery({
    queryKey: ["dailyData", pageSize, pageNumber],
    queryFn: () => getDailyDataAsync(pageNumber, pageSize),
  });

  return (
    <div className="mainview">
      <h1>Electricity Data Dashboard</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading data</p>}
      {data && (
        <>
          <DataTable dayData={data.data} pageSize={pageSize} />
          <Pagination
            pageNumber={pageNumber}
            pageSize={pageSize}
            totalPages={data.totalPages}
            itemsOnCurrentPage={data.data.length}
            onPageChange={(newPage) => setPageNumber(newPage)}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          />
        </>
      )}
    </div>
  );
}

export default App;
