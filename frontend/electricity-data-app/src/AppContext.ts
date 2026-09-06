import { createContext } from "react";
import type { CurrentPagination } from "./types/currentPagination";

const AppContext = createContext<CurrentPagination>({
  pageSize: 10,
  page: 1,
  orderBy: "date",
  orderDir: "asc",
});
export default AppContext;
