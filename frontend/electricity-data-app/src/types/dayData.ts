/**
 * Frontend representation of electricity data for a single day
 */
export type DayData = {
  date: string;
  consumptionAmount: string;
  productionAmount: string;
  averageHourlyPrice: number;
  cheapestHour: {
    hour: string;
    price: number;
  };
};
