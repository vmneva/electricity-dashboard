import type { components } from "./schema";

const baseUrl = "/api/electricity/daily-data";

/**
 * Fetch data for a specified day from the API endpoint /api/electricity/daily-data/{date}
 * Returns a Promise that resolves to a DayData object representing the data for the specified day
 */
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
 * Returns a Promise that resolves to an array of DayData objects representing the data for each day.
 * Includes pagination support so query parameters require page number and size.
 */
export async function getDailyDataAsync(
  page: number,
  size: number,
  orderBy: string,
  orderDir: "asc" | "desc",
  search?: string,
): Promise<components["schemas"]["PaginatedData"]> {
  const response = await fetch(
    `${baseUrl}?pageSize=${size}&pageNumber=${page}&orderBy=${orderBy}&orderDir=${orderDir}&search=${search ?? ""}`,
  );
  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.status}`);
  }
  const result: components["schemas"]["PaginatedData"] = await response.json();

  return result;
}
