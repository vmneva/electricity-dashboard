import "../scss/styles.scss";
import { useContext } from "react";
import AppContext from "../AppContext";

type Props = {
  label: string;
  value: string;
  isOrderable: boolean;
  handleClick: (value: string) => void;
};

function HeaderCell({ label, value, isOrderable, handleClick }: Props) {
  const { orderBy, orderDir } = useContext(AppContext);
  return (
    <th>
      {isOrderable ? (
        <button onClick={() => handleClick(value)}>
          {label}{" "}
          {orderBy === value ? (orderDir === "asc" ? "🔽" : "🔼") : "🔽"}
        </button>
      ) : (
        label
      )}
    </th>
  );
}

export default HeaderCell;
