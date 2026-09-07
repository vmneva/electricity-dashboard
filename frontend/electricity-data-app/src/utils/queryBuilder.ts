import type { components } from "../api/schema";

/**
 * Builds a query URL for fetching data with pagination, sorting, and filtering options.
 * @param baseUrl The base URL of the API endpoint.
 * @param req The request object containing pagination, sorting, and filtering options.
 * @returns The full URL with query parameters.
 */
export function buildQueryUrl(
  baseUrl: string,
  req: components["schemas"]["DailyDataRequest"],
): string {
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
