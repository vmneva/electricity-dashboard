// Mapper for transforming API data into frontend-friendly format
import type { components } from "../api/schema";
import type { DayData } from "../types/dayData";
import type { PaginatedData } from "../types/paginatedData";
import type { SingleDayData } from "../types/singleDayData";
import { roundToDecimals, parseHour, formatThousands } from "./formatters";

/*
Maps API data to single day data used in the UI
*/
export function mapApiDataToSingleDayData(
  apiData: components["schemas"]["SingleDayData"],
): SingleDayData {
  return {
    date: apiData.date ?? "",
    productionTotal: apiData.productionTotal as number,
    consumptionTotal: apiData.consumptionTotal as number,
    averageHourlyPrice: roundToDecimals(
      apiData.averageHourlyPrice as number,
      3,
    ),
    allHourlyPrices:
      apiData.allHourlyPrices?.map((price) =>
        roundToDecimals(price as number, 3),
      ) ?? [],
    productionAmounts:
      apiData.productionAmounts?.map((amount) => amount as number) ?? [],
    consumptionAmounts:
      apiData.consumptionAmounts?.map((amount) => amount as number) ?? [],
  };
}

/*
 * Maps API data to a DayData object used in the UI
 */
function mapApiDataToDailyData(
  apiData: components["schemas"]["DailyData"],
): DayData {
  return {
    date: apiData.date ?? "",
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
