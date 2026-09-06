import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  getDailyDataAsync,
  getSingleDayDataAsync,
} from "../api/electricityData";
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

export function useSingleDayData(date: string) {
  return useQuery({
    queryKey: ["singleDayData", date],
    queryFn: () => getSingleDayDataAsync(date),
    placeholderData: keepPreviousData,
  });
}
