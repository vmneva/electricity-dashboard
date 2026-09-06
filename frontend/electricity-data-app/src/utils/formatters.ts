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
  return value?.slice(0, 5) ?? "";
}

/*
  Formats thousands to 100 000 format
*/
export function formatThousands(value: number): string {
  const rounded = Math.round(value);
  return rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
