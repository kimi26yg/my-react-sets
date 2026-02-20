import React, { useState, useEffect } from "react";
import styles from "./UpDown.module.css";

function UpDown({ userInfo }) {
  const [num, setNum] = useState("");
  const [result, setResult] = useState("");
  const [count, setCount] = useState(0);
  const [correct, setCorrect] = useState(
    () => Math.floor(Math.random() * 100) + 1,
  );

  const handleClick = () => {
    const userNum = parseInt(num);
    if (isNaN(userNum)) {
      setResult("숫자를 입력해주세요!");
      return;
    }

    const nextCount = count + 1;
    setCount(nextCount);

    console.log(`--- ${nextCount}회차 시도 ---`);
    console.log("정답:", correct, "입력:", userNum);

    if (userNum > correct) setResult("DOWN하세요");
    else if (userNum < correct) setResult("UP하세요");
    else setResult(`정답입니다! ${nextCount}번 만에 맞추셨네요!`);
  };

  const handleReset = () => {
    setNum("");
    setResult("");
    setCount(0);
    setCorrect(Math.floor(Math.random() * 100) + 1);
    console.clear();
  };

  const name = userInfo?.name || "";

  return (
    <div className={styles.updownMain}>
      <h2 className={styles.challengeMsg}>
        대결해보실래요 {name ? `${name}님` : ""} ?
      </h2>
      <p className={styles.countDisplay}>현재 시도 횟수: {count}회</p>

      {/* 입력창 (단독 배치) */}
      <input
        type="number"
        className={styles.userInput}
        placeholder="숫자 입력 (1~100)"
        value={num}
        onChange={(e) => setNum(e.target.value)}
      />

      {/* 버튼 그룹 (입력창 밑에 가로로 배치) */}
      <div className={styles.buttonGroup}>
        <button
          className={`${styles.btn} ${styles.submitBtn}`}
          onClick={handleClick}
        >
          제출
        </button>
        <button
          className={`${styles.btn} ${styles.resetBtn}`}
          onClick={handleReset}
        >
          리셋
        </button>
      </div>

      <p
        id={styles.result}
        className={result.includes("정답") ? styles.correct : ""}
      >
        {result}
      </p>
    </div>
  );
}

export default UpDown;
