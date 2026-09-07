import type { components } from "./schema";

const baseUrl = "/api/electricity/daily-data";

/**
 * Fetch data for a specified day from the API endpoint /api/electricity/daily-data/{date} */
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
 * Includes pagination support so query parameters require page number and size.
 * Includes optional sorting and filtering parameters.
 */
export async function getDailyDataAsync(
  req: components["schemas"]["DailyDataRequest"],
): Promise<components["schemas"]["PaginatedData"]> {
  const response = await fetch(buildQueryUrl(req));
  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.status}`);
  }
  const result: components["schemas"]["PaginatedData"] = await response.json();

  return result;
}

function buildQueryUrl(req: components["schemas"]["DailyDataRequest"]): string {
  const params = new URLSearchParams();

  const add = (key: string, value: unknown) => {
    if (value !== undefined && value !== null && value !== "") {
      params.set(key, String(value));
    }
  };

  add("Pagination.pageNumber", req.pagination?.pageNumber);
  add("Pagination.pageSize", req.pagination?.pageSize);
  add("Sort.orderBy", req.sort?.orderBy);
  add("Sort.orderDir", req.sort?.orderDir);
  add("Filters.date", req.filters?.date);
  add("Filters.startDate", req.filters?.startDate);
  add("Filters.endDate", req.filters?.endDate);
  add("Filters.minPrice", req.filters?.minPrice);
  add("Filters.maxPrice", req.filters?.maxPrice);

  const qs = params.toString();
  return qs ? `${baseUrl}?${qs}` : baseUrl;
}
