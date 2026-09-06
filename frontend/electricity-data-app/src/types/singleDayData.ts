/*
  Represents the electricity data for a single day showed in the dialog.
*/

export type SingleDayData = {
  date: string;
  productionTotal: number;
  consumptionTotal: number;
  averageHourlyPrice: number;
  allHourlyPrices: number[];
  productionAmounts: number[];
  consumptionAmounts: number[];
};
