import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  getDailyDataAsync,
  getSingleDayDataAsync,
} from "../api/electricityData";
import type { components } from "../api/schema";

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

export function useSingleDayData(date: string) {
  return useQuery({
    queryKey: ["singleDayData", date],
    queryFn: () => getSingleDayDataAsync(date),
    placeholderData: keepPreviousData,
  });
}
