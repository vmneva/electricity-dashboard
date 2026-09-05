import type { DayData } from "../types/dayData";

type Props = {
  dayData: DayData;
  isHeader: boolean;
};

function TableRow({ dayData, isHeader }: Props) {
  return (
    <>
      <tr>
        {isHeader ? (
          <>
            <th>Date</th>
            <th>Consumption</th>
            <th>Production</th>
            <th>Average Price</th>
            <th>Cheapest Hour</th>
          </>
        ) : (
          <>
            <td>{dayData.date}</td>
            <td>{dayData.consumptionAmount as number} kWh</td>
            <td>{dayData.productionAmount as number} MWh/h</td>
            <td>{dayData.averageHourlyPrice as number} snt/kWh</td>
            <td>
              {dayData.cheapestHour?.hour} (
              {dayData.cheapestHour?.price as number} snt/kWh)
            </td>
          </>
        )}
      </tr>
    </>
  );
}

export default TableRow;
