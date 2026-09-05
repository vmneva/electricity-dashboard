import type { DayData } from "../types/dayData";
import type { components } from "./schema";
import { mapApiDataToDailyData } from "../helpers/mappers";

const baseUrl = "/api/electricity/daily-data";

/**
 * Fetch data for a specified day from the API endpoint /api/electricity/daily-data/{date}
 * Returns a Promise that resolves to a DayData object representing the data for the specified day
 */
export async function getSingleDayDataAsync(date: string): Promise<DayData> {
  const response = await fetch(`${baseUrl}/${date}`);
  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.status}`);
  }
  const result: components["schemas"]["DailyData"] = await response.json();

  return mapApiDataToDailyData(result);
}
