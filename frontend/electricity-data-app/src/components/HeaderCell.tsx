import "../scss/styles.scss";
import { useContext } from "react";
import AppContext from "../context/AppContext";

type Props = {
  label: string;
  value: string;
  isOrderable: boolean;
  handleClick: (value: string) => void;
};

function HeaderCell({ label, value, isOrderable, handleClick }: Props) {
  const { pagination } = useContext(AppContext)!;
  const { orderBy, orderDir } = pagination;

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
