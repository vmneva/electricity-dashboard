import "../scss/styles.scss";
import { useAppContext } from "../context/AppContext";

type Props = {
  label: string;
  value: string;
  isOrderable: boolean;
  handleClick: (value: string) => void;
};

function HeaderCell({ label, value, isOrderable, handleClick }: Props) {
  const { sorting } = useAppContext();

  return (
    <th>
      {isOrderable ? (
        <button onClick={() => handleClick(value)}>
          {label}{" "}
          {sorting.orderBy === value
            ? sorting.orderDir === "asc"
              ? "🔽"
              : "🔼"
            : "🔽"}
        </button>
      ) : (
        label
      )}
    </th>
  );
}

export default HeaderCell;
