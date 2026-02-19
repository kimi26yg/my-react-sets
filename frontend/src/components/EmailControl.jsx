import React, { useState } from "react";
import "./Counter.css";
// 1. state가 변경되면 컴포넌트가 다시 그려집니다.
// 2. 입력창에 입력되는 값(value)는 상태로 관리한다.
const EmailControl = () => {
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setIsSubmitted(false);
  };
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const checkEmail = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValid = emailRegex.test(email);

    setEmailValid(isValid); // 유효성 결과 저장
    setIsSubmitted(true);
  };
  return (
    <>
      <div>
        <input
          type="email"
          placeholder="이메일을 입력하세요"
          onChange={handleEmail}
          value={email}
        />
        <button onClick={checkEmail} disabled={!email}>
          메일 확인
        </button>
      </div>
      {isSubmitted && !emailValid && (
        <p style={{ color: "#ff6b6b", marginTop: "10px" }}>
          올바른 이메일 형식이 아닙니다.
        </p>
      )}
    </>
  );
};

export default EmailControl;
