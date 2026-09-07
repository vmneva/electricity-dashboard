import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  getDailyDataAsync,
  getSingleDayDataAsync,
} from "../api/electricityData";
import type { components } from "../api/schema";

/**
 * Custom hook to fetch daily electricity data from the API endpoint /daily-data
 */
export function useDailyData(req: components["schemas"]["DailyDataRequest"]) {
  return useQuery({
    queryKey: ["dailyData", req],
    queryFn: () =>
      getDailyDataAsync({
        ...req,
      }),
    placeholderData: keepPreviousData,
  });
}

/**
 * Custom hook to fetch electricity data for a single day from the API endpoint /daily-data/{date}
 */
export function useSingleDayData(date: string) {
  return useQuery({
    queryKey: ["singleDayData", date],
    queryFn: () => getSingleDayDataAsync(date),
    placeholderData: keepPreviousData,
  });
}
