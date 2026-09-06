import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getDailyDataAsync } from "../api/electricityData";
import type { CurrentPagination } from "../types/currentPagination";

export function useDailyData(pagination: CurrentPagination) {
  return useQuery({
    queryKey: ["dailyData", pagination],
    queryFn: () =>
      getDailyDataAsync(
        pagination.page,
        pagination.pageSize,
        pagination.orderBy,
        pagination.orderDir,
      ),
    placeholderData: keepPreviousData,
  });
}
