import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getDailyDataAsync } from "../api/electricityData";
import type { CurrentPagination } from "../types/currentPagination";

export function useDailyData(
  pagination: CurrentPagination,
  searchDate: string,
) {
  return useQuery({
    queryKey: ["dailyData", pagination, searchDate],
    queryFn: () =>
      getDailyDataAsync(
        pagination.page,
        pagination.pageSize,
        pagination.orderBy,
        pagination.orderDir,
        searchDate,
      ),
    placeholderData: keepPreviousData,
  });
}
