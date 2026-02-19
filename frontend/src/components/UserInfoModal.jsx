import React, { useState } from "react";
import styles from "./UserInfoModal.module.css";

export default function UserInfoModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    birthdate: "",
    gender: "male",
  });

  React.useEffect(() => {
    if (isOpen) {
      const savedInfo = localStorage.getItem("user_info");
      if (savedInfo) {
        setFormData(JSON.parse(savedInfo));
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>Info Settings</h2>
        <p className={styles.description}>
          입력된 정보는 각 페이지에 표시되는 용도로만 사용되며,
          <br />
          외부 서버로 전송되거나 이용되지 않습니다.
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>이름</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="홍길동"
              required
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>생년월일</label>
            <input
              type="date"
              name="birthdate"
              value={formData.birthdate}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>성별</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className={styles.input}
            >
              <option value="male">남성</option>
              <option value="female">여성</option>
              <option value="other">기타</option>
            </select>
          </div>

          <button type="submit" className={styles.submitButton}>
            저장하기
          </button>
        </form>
      </div>
    </div>
  );
}
