import "../scss/styles.scss";
import {
  formatDate,
  formatPrice,
  formatThousand,
  parseHour,
} from "../utils/formatters";
import { useAppContext } from "../context/AppContext";
import type { components } from "../api/schema";

type Props = {
  dayData: components["schemas"]["DailyData"][];
  setDateSelected: (date: components["schemas"]["DailyData"]["date"]) => void;
};

function DataTable({ dayData, setDateSelected }: Props) {
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
    <>
      {dayData.length === 0 ? (
        <p>No data available. Please adjust the filters above.</p>
      ) : (
        <div className={`table-panel table-panel--${pageSize}}`} tabIndex={0}>
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
                  <td data-label="Date" className="canOpen">
                    <button
                      type="button"
                      onClick={() => {
                        setDateSelected(data.date);
                      }}
                    >
                      {formatDate(data.date)}
                    </button>
                  </td>
                  <td data-label="Consumption">
                    {formatThousand(data.consumptionAmount)}
                    <span className="unit">kWh</span>
                  </td>
                  <td data-label="Production">
                    {formatThousand(data.productionAmount)}
                    <span className="unit">MWh/h</span>
                  </td>
                  <td data-label="Average price">
                    {formatPrice(data.averageHourlyPrice)}
                    {data.averageHourlyPrice !== 0 && (
                      <span className="unit">snt/kWh</span>
                    )}
                  </td>
                  <td data-label="Cheapest hour">
                    {parseHour(data.cheapestHour?.hour)}{" "}
                    {formatPrice(data.cheapestHour?.price) !== "N/A" && (
                      <span className="unit">
                        ({formatPrice(data.cheapestHour?.price)} snt/kWh)
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default DataTable;
