import { useState } from "react";
import styles from "./Counter.module.css";

function Counter() {
  const [count, setCount] = useState(0);
  const max = 10;
  const min = -10;
  const addCount = () => {
    setCount(count + 1);
    console.log(count);
  };
  const minusCount = () => {
    setCount(count - 1);
    console.log(count);
  };
  const resetCount = () => {
    setCount((count) => 0);
    console.log(count);
  };

  return (
    <div className={styles.counter}>
      <h1
        className={`${styles.count} ${count > 0 ? styles.positive : count < 0 ? styles.negative : ""}`}
      >
        {count}
      </h1>
      <div className={styles.buttons}>
        <button
          className={styles.button}
          onClick={minusCount}
          disabled={count <= min}
        >
          -
        </button>
        <button
          className={styles.button}
          onClick={resetCount}
          disabled={count == 0}
        >
          Reset
        </button>
        <button
          className={styles.button}
          onClick={addCount}
          disabled={count >= max}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default Counter;
