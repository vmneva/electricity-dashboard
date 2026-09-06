import { createContext, useContext } from "react";
import type { CurrentPagination } from "../types/currentPagination";

type AppContextValue = {
  pagination: CurrentPagination;
  setPagination: React.Dispatch<React.SetStateAction<CurrentPagination>>;
};

const AppContext = createContext<AppContextValue | null>(null);

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContext.Provider");
  }
  return context;
}

export default AppContext;
