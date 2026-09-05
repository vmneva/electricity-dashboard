/**
 * Utility functions for formatting and parsing column values
 */

export function roundToDecimals(value: number, decimals: number): number {
  const divider = Math.pow(10, decimals);
  return Math.round(value * divider) / divider;
}

export function parseHour(value: string): string {
  return value?.slice(0, 5) ?? "";
}
