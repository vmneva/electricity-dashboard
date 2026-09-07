import type { components } from "./schema";
import { buildQueryUrl } from "../utils/queryBuilder";

const baseUrl = "/api/electricity/daily-data";

/**
 * Fetch data for a specified day from the API endpoint /api/electricity/daily-data/{date}
 * @param date The date for which to fetch the data in format YYYY-MM-DD.
 * @returns The data for the specified day.
 * */
export async function getSingleDayDataAsync(
  date: string,
): Promise<components["schemas"]["SingleDayData"]> {
  const response = await fetch(`${baseUrl}/${date}`);
  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.status}`);
  }
  const result: components["schemas"]["SingleDayData"] = await response.json();

  return result;
}

/**
 * Fetch list of daily data from the API endpoint /api/electricity/daily-data
 * @param req The request object containing pagination, sorting, and filtering options.
 * @returns The paginated list of daily data.
 */
export async function getDailyDataAsync(
  req: components["schemas"]["DailyDataRequest"],
): Promise<components["schemas"]["PaginatedData"]> {
  const response = await fetch(buildQueryUrl(baseUrl, req));
  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.status}`);
  }
  const result: components["schemas"]["PaginatedData"] = await response.json();

  return result;
}
