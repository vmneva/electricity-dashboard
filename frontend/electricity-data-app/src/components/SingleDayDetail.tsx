import "../scss/styles.scss";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useSingleDayData } from "../hooks/useDailyData";
import { formatDate, formatPrice, formatThousand } from "../utils/formatters";
import PriceChart from "./PriceChart";

/*
Component for the detailed popup view of one day's data
*/

type Props = {
  date: string;
  onClose: () => void;
};

function SingleDayDetail({ date, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const { data: dayData, isLoading, error } = useSingleDayData(date);

  useEffect(() => {
    ref.current?.showModal();
  }, []);

  return createPortal(
    <dialog
      ref={ref}
      className="row-detail"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) ref.current.close();
      }}
    >
      {isLoading && <p className="row-detail__state">Loading…</p>}
      {error && (
        <p className="row-detail__state">
          Couldn’t load this day. Close and try again.
        </p>
      )}

      {dayData && (
        <>
          <header>
            <h2>Details for {formatDate(dayData.date)}</h2>
          </header>
          <dl>
            <dt>Total consumption of the day</dt>
            <dd>{formatThousand(dayData.consumptionTotal?.toString())} kWh</dd>
            <dt>Total production of the day</dt>
            <dd>{formatThousand(dayData.productionTotal?.toString())} MWh/h</dd>
            <dt>Average price of the day</dt>
            <dd>{formatPrice(dayData.averageHourlyPrice)} snt/kWh</dd>
          </dl>
          {dayData.averageHourlyPrice != 0 && (
            <PriceChart prices={dayData.allHourlyPrices as number[]} />
          )}
        </>
      )}
    </dialog>,
    document.body,
  );
}

export default SingleDayDetail;
