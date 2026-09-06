/*
  This file defines the type for the current pagination state.
*/

export type CurrentPagination = {
  pageSize: number;
  page: number;
  orderBy: string;
  orderDir: "asc" | "desc";
};
