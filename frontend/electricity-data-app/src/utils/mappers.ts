// Mapper for transforming API data into frontend-friendly format
import type { components } from "../api/schema";
import type { DayData } from "../types/dayData";
import { roundToDecimals, parseHour, formatThousands } from "./formatters";

/*
 * Maps API data to a DayData object used in the UI
 */
export function mapApiDataToDailyData(
  apiData: components["schemas"]["DailyData"],
): DayData {
  return {
    date: new Date(apiData.date ?? "").toLocaleDateString(),
    consumptionAmount: formatThousands(apiData.consumptionAmount as number),
    productionAmount: formatThousands(apiData.productionAmount as number),
    averageHourlyPrice: roundToDecimals(
      apiData.averageHourlyPrice as number,
      3,
    ),
    cheapestHour: {
      hour: parseHour(apiData.cheapestHour?.hour ?? ""),
      price: roundToDecimals(apiData.cheapestHour?.price as number, 3),
    },
  };
}

/*
 * Maps API data to a PaginatedData object used in the UI
 */
export function mapApiDataToPaginatedData(
  apiData: components["schemas"]["PaginatedResponse"],
): PaginatedData {
  return {
    totalPages: apiData.allPages as number,
    data: apiData.dailyRows?.map(mapApiDataToDailyData) ?? [],
  };
}
import type { PaginatedData } from "../types/paginatedData";
