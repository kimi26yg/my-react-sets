import React, { useState } from "react";
import "./Counter.css";
// 1. state가 변경되면 컴포넌트가 다시 그려집니다.
// 2. 입력창에 입력되는 값(value)는 상태로 관리한다.
const InputControl = () => {
  const [inputValue, setInputValue] = useState("");
  return (
    <>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
        <button
          onClick={(inputValue) => {
            setInputValue("");
          }}
          disabled={!inputValue}
        >
          초기화
        </button>
        <button>({inputValue.length})</button>
      </div>
      {inputValue.toUpperCase()}
    </>
  );
};

export default InputControl;
