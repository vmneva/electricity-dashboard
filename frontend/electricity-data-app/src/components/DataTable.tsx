import type { DayData } from "../types/dayData";
import "../scss/styles.scss";

type Props = {
  dayData: DayData[];
  pageSize: number;
};

function DataTable({ dayData, pageSize }: Props) {
  return (
    <div className={`table-panel table-panel--${pageSize}`} tabIndex={0}>
      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Total Consumption (kWh)</th>
            <th>Total Production (MWh/h)</th>
            <th>Average Price (snt/kWh)</th>
            <th>Cheapest Hour</th>
          </tr>
        </thead>
        <tbody>
          {dayData.map((data) => (
            <tr key={data.date}>
              <td data-label="Date">{data.date}</td>
              <td data-label="Consumption">
                {data.consumptionAmount}
                <span className="unit">kWh</span>
              </td>
              <td data-label="Production">
                {data.productionAmount}
                <span className="unit">MWh/h</span>
              </td>
              <td data-label="Average price">
                {data.averageHourlyPrice}
                <span className="unit">snt/kWh</span>
              </td>
              <td data-label="Cheapest hour">
                {data.cheapestHour.hour}{" "}
                <span className="unit">
                  ({data.cheapestHour.price} snt/kWh)
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
