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
export function parseHour(value: string): string {
  if (!value) return "N/A";
  return value?.slice(0, 5);
}

export function formatPrice(value: number): string {
  if (value === 0 || value == null) return "N/A";
  return `${roundToDecimals(value, 2)}`;
}

/*
  Formats thousands to 100 000 format
*/
export function formatThousands(value: number): string {
  const rounded = Math.round(value);
  return rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

/*
  Formats a date string in the format YYYY-MM-DD to a more readable format
*/
export function formatDate(value: string): string {
  const date = new Date(value);
  return date.toLocaleDateString();
}
