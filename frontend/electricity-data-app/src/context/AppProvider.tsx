import { useState, useMemo, type ReactNode } from "react";
import AppContext from "./AppContext";
import type { CurrentPagination } from "../types/currentPagination";

export function AppProvider({ children }: { children: ReactNode }) {
  const [pagination, setPagination] = useState<CurrentPagination>({
    page: 1,
    pageSize: 10,
    orderBy: "date",
    orderDir: "asc",
  });

  const value = useMemo(() => ({ pagination, setPagination }), [pagination]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
