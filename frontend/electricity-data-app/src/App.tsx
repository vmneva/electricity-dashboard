import { useState } from "react";
import { getSingleDayDataAsync } from "./api/electricityData";
import "./scss/styles.scss";
import "./App.scss";
import type { DayData } from "./types/dayData";
import TableRow from "./components/TableRow";

function App() {
  const [date, setDate] = useState("2021-01-01");
  const [dayData, setDayData] = useState<DayData | null>(null);

  function fetchData() {
    getSingleDayDataAsync(date)
      .then((data) => {
        setDayData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  return (
    <>
      <div className="mainview">
        <h1>Electricity Data Dashboard</h1>
        <div className="search-container">
          <input
            className="input-field"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <button className="button-secondary" onClick={() => fetchData()}>
            Fetch Data
          </button>
        </div>
        {dayData && (
          <section>
            <table
              className="table"
              style={{ alignSelf: "top", justifySelf: "center" }}
            >
              <thead>
                <TableRow dayData={dayData} isHeader={true} />
              </thead>
              <tbody>
                <TableRow dayData={dayData} isHeader={false} />
              </tbody>
            </table>
          </section>
        )}
      </div>
    </>
  );
}

export default App;
