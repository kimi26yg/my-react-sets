import React from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import { useState, useEffect } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [quote, setQuote] = useState("");
  const [characteristics, setCharacteristics] = useState("");

  useEffect(() => {
    async function getHomeData() {
      try {
        const response = await fetch("/api/");
        const data = await response.json();
        setMessage(data.message);
      } catch (error) {
        console.error("Failed to fetch home data:", error);
      }
    }
    getHomeData();
  }, []);

  useEffect(() => {
    async function getCharacteristics() {
      try {
        const response = await fetch("/api/characteristics");
        const data = await response.json();
        setCharacteristics(data.characteristics);
      } catch (error) {
        console.error("Failed to fetch characteristics:", error);
      }
    }
    getCharacteristics();
  }, []);

  useEffect(() => {
    async function getQuote() {
      try {
        const response = await fetch("/api/quote");
        const data = await response.json();
        setQuote(data.quote);
      } catch (error) {
        console.error("Failed to fetch quote:", error);
      }
    }
    getQuote();
  }, []);

  useEffect(() => {
    const savedInfo = localStorage.getItem("user_info");
    if (savedInfo) {
      const parsedInfo = JSON.parse(savedInfo);
      setName(parsedInfo.name);
    }
  }, []);
  const features = [
    {
      to: "/TodoList",
      title: "할 일 목록",
      desc: "하루 일과를 효율적으로 관리하세요. 진행 중이거나 완료된 작업을 필터링할 수 있습니다.",
      icon: "📝",
    },
    {
      to: "/Counter",
      title: "카운터",
      desc: "숫자 증가, 감소, 초기화 기능이 있는 간단한 카운터 앱입니다.",
      icon: "🔢",
    },
    {
      to: "/UpDown",
      title: "업 다운 게임",
      desc: "1부터 100 사이의 숫자를 맞춰보세요. 행운과 전략을 시험해보세요!",
      icon: "🎯",
    },
    {
      to: "/FestivalList",
      title: "전국 축제 정보",
      desc: "대한민국의 다양한 축제 정보를 확인하고 여행을 계획해보세요.",
      icon: "🎉",
    },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>대시보드</h1>
      <p className={styles.subtitle}>
        <strong>
          {message} {characteristics} {name}님
        </strong>{" "}
        <br />
        {quote}
      </p>

      <div className={styles.grid}>
        {features.map((feature) => (
          <Link key={feature.to} to={feature.to} className={styles.card}>
            <div className={styles.cardIcon}>{feature.icon}</div>
            <h2 className={styles.cardTitle}>{feature.title}</h2>
            <p className={styles.cardDesc}>{feature.desc}</p>
            <div className={styles.cardArrow}>앱으로 이동 →</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
