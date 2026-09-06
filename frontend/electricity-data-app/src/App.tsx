import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import AppContext from "./AppContext";
import { getDailyDataAsync } from "./api/electricityData";
import DataTable from "./components/DataTable";
import Pagination from "./components/Pagination";
import type { CurrentPagination } from "./types/currentPagination";
import "./scss/styles.scss";
import "./App.scss";

function App() {
  const [pageOptions, setPageOptions] = useState<CurrentPagination>({
    pageSize: 10,
    page: 1,
    orderBy: "date",
    orderDir: "asc",
  });

  const {
    data,
    isLoading: isListLoading,
    error: listError,
  } = useQuery({
    queryKey: [
      "dailyData",
      pageOptions.pageSize,
      pageOptions.page,
      pageOptions.orderBy,
      pageOptions.orderDir,
    ],
    queryFn: () =>
      getDailyDataAsync(
        pageOptions.page,
        pageOptions.pageSize,
        pageOptions.orderBy,
        pageOptions.orderDir,
      ),
  });

  return (
    <AppContext.Provider
      value={{
        page: pageOptions.page,
        pageSize: pageOptions.pageSize,
        orderBy: pageOptions.orderBy,
        orderDir: pageOptions.orderDir,
      }}
    >
      <div className="mainview">
        <h1>Electricity Data Dashboard</h1>
        {isListLoading && <p>Loading...</p>}
        {listError && <p>Error loading data</p>}
        {data && (
          <>
            <DataTable
              dayData={data.data}
              onOrderByChange={(newOrderBy) =>
                setPageOptions((prev) => ({
                  ...prev,
                  orderBy: newOrderBy,
                }))
              }
              onOrderDirChange={(newOrderDir) =>
                setPageOptions((prev) => ({
                  ...prev,
                  orderDir: newOrderDir,
                }))
              }
            />
            <Pagination
              totalPages={data.totalPages}
              itemsOnCurrentPage={data.data.length}
              onPageChange={(newPage) =>
                setPageOptions((prev) => ({
                  ...prev,
                  page: newPage,
                }))
              }
              onPageSizeChange={(newPageSize) =>
                setPageOptions((prev) => ({
                  ...prev,
                  pageSize: newPageSize,
                }))
              }
            />
          </>
        )}
      </div>
    </AppContext.Provider>
  );
}
export default App;
