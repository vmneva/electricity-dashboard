import "../scss/styles.scss";
import { BarChart, Bar, ReferenceLine, Tooltip } from "recharts";

type Props = {
  prices: number[];
};

function PriceChart({ prices }: Props) {
  if (prices.length === 0 || !prices) {
    return <p>No price data available.</p>;
  }

  return (
    <figure>
      <BarChart
        style={{
          width: "100%",
          maxHeight: "40vh",
          aspectRatio: 1.618,
        }}
        data={prices.map((price, index) => ({ hour: index, price: price }))}
        margin={{
          top: 10,
          right: 0,
          left: 0,
          bottom: 10,
        }}
      >
        <ReferenceLine y={0} />
        <Tooltip
          labelFormatter={(hour) => `${String(hour).padStart(2, "0")}:00`}
          formatter={(value) => [`${Number(value).toFixed(2)} snt/kWh`]}
        />
        <Bar dataKey="price" radius={[10, 10, 0, 0]}></Bar>
      </BarChart>
      <figcaption>
        Graphical representation of the electricity prices throughout the day.
        Hover over the bars to see the data.
      </figcaption>
    </figure>
  );
}

export default PriceChart;
