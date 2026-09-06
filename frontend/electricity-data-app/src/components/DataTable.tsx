import type { DayData } from "../types/dayData";
import { useAppContext } from "../context/AppContext";
import "../scss/styles.scss";

type Props = {
  dayData: DayData[];
};

function DataTable({ dayData }: Props) {
  const { pagination, setPagination } = useAppContext();
  const { pageSize, orderBy, orderDir } = pagination;

  function handleHeaderClick(column: string) {
    const newOrderDir =
      orderBy === column && orderDir === "asc" ? "desc" : "asc";
    setPagination((prev) => ({
      ...prev,
      orderBy: column,
      orderDir: newOrderDir,
    }));
  }

  function renderHeaderCell(
    label: string,
    value: string,
    isOrderable: boolean = true,
  ) {
    return (
      <th>
        {isOrderable ? (
          <button onClick={() => handleHeaderClick(value)}>
            {label}{" "}
            {orderBy === value ? (orderDir === "asc" ? "🔽" : "🔼") : "🔽"}
          </button>
        ) : (
          label
        )}
      </th>
    );
  }

  return (
    <div className={`table-panel table-panel--${pageSize}`} tabIndex={0}>
      <table className="table">
        <thead>
          <tr>
            {renderHeaderCell("Date", "date", true)}
            {renderHeaderCell(
              "Total Consumption (kWh)",
              "consumptionAmount",
              true,
            )}
            {renderHeaderCell(
              "Total Production (MWh/h)",
              "productionAmount",
              true,
            )}
            {renderHeaderCell(
              "Average Price (snt/kWh)",
              "averageHourlyPrice",
              true,
            )}
            {renderHeaderCell("Cheapest Hour", "cheapestHour", false)}
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
