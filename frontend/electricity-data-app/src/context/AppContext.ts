import { createContext, useContext } from "react";
import type { components } from "../api/schema";

/**
 * Context for managing application-wide state including pagination, sorting, and filtering options.
 */

type AppContextValue = {
  pagination: components["schemas"]["Pagination"];
  sorting: components["schemas"]["SortOptions"];
  setPagination: React.Dispatch<
    React.SetStateAction<components["schemas"]["Pagination"]>
  >;
  setSorting: React.Dispatch<
    React.SetStateAction<components["schemas"]["SortOptions"]>
  >;
  filtering: components["schemas"]["FilterOptions"];
  setFiltering: React.Dispatch<
    React.SetStateAction<components["schemas"]["FilterOptions"]>
  >;
};

const AppContext = createContext<AppContextValue | null>(null);

// Provides access to the AppContext and its state from components.
export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContext.Provider");
  }
  return context;
}

export default AppContext;
