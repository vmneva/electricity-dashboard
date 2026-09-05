/**
 * Frontend representation of electricity data for a single day
 */
export type DayData = {
  date: string;
  consumptionAmount: number;
  productionAmount: number;
  averageHourlyPrice: number;
  cheapestHour: {
    hour: string;
    price: number;
  };
};
