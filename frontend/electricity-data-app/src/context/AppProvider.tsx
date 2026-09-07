import { useState, useMemo, type ReactNode } from "react";
import AppContext from "./AppContext";
import type { components } from "../api/schema";

export function AppProvider({ children }: { children: ReactNode }) {
  const [pagination, setPagination] = useState<
    components["schemas"]["Pagination"]
  >({
    pageSize: 10,
    pageNumber: 1,
  });

  const [sorting, setSorting] = useState<components["schemas"]["SortOptions"]>({
    orderDir: undefined,
    orderBy: undefined,
  });

  const [filtering, setFiltering] = useState<
    components["schemas"]["FilterOptions"]
  >({
    startDate: undefined,
    endDate: undefined,
    minPrice: undefined,
    maxPrice: undefined,
  });

  const value = useMemo(
    () => ({
      pagination,
      setPagination,
      sorting,
      setSorting,
      filtering,
      setFiltering,
    }),
    [pagination, setPagination, sorting, setSorting, filtering, setFiltering],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
