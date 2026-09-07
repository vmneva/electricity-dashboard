/*
  Rounds value to wanted decimals
*/
export function roundToDecimals(value: number, decimals: number): number {
  const divider = Math.pow(10, decimals);
  return Math.round(value * divider) / divider;
}

/*
  Parses the hour from a string in the format HH:MM
*/
export function parseHour(value: string | null | undefined): string {
  if (!value) return "N/A";
  return value?.slice(0, 5);
}

/*
  Formats a price value to 2 decimal places, returns "N/A" if the value is 0 or null
*/
export function formatPrice(
  value: number | null | undefined | unknown,
): string {
  if (value === 0 || !value || typeof value !== "number") return "N/A";
  return `${roundToDecimals(value, 2)}`;
}

/*
  Formats thousands to 100 000 format
*/
export function formatThousand(value: string | null | undefined): string {
  if (!value) return "N/A";
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, " ").split(".")[0];
}

/*
  Formats a date string in the format YYYY-MM-DD to a more readable format
*/
export function formatDate(value: string | null | undefined): string {
  if (!value) return "N/A";
  const date = new Date(value);
  return date.toLocaleDateString("fi-FI");
}
