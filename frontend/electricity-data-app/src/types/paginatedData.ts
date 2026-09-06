import type { DayData } from "./dayData";

/**
 * Represents paginated data shown in the data table on the UI.
 */
export type PaginatedData = {
  totalPages: number;
  data: DayData[];
};
