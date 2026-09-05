import { useState } from "react";
import "./scss/styles.scss";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <section className="center">
        <div>
          <h1>Hello world</h1>
        </div>
        <button
          type="button"
          className="button-primary"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
        <button
          type="button"
          className="button-secondary"
          onClick={() => setCount((count) => count - 1)}
        >
          Decrease count
        </button>
      </section>
    </>
  );
}

export default App;
