import React, { useState, useEffect } from "react";
import styles from "./FestivalList.module.css";

const WITTY_MESSAGES = [
  "전국을 돌면서 축제가 있는지 유랑하는 중...",
  "솜사탕 기계 예열하는 중...",
  "야시장 닭꼬치 굽는 중...",
  "축제 팜플렛 인쇄하는 중... 🖨️",
  "폭죽 장전하는 중... 🎆",
  "스피커 볼륨 높이는 중... 🔊",
  "푸드트럭 줄 서서 기다리는 중...",
];

function FestivalList({ userInfo }) {
  // 로컬 개발용: API 키는 백엔드에서 처리
  const url = "/api/festivals?pageNo=1&numOfRows=1000";
  const [festvs, setfestvs] = useState([]);
  const [randomFestival, setRandomFestival] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState(WITTY_MESSAGES[0]);
  const name = userInfo?.name || "";

  useEffect(() => {
    let messageInterval;
    if (isLoading) {
      messageInterval = setInterval(() => {
        setLoadingMessage((prevText) => {
          let nextText;
          do {
            const randomIndex = Math.floor(
              Math.random() * WITTY_MESSAGES.length,
            );
            nextText = WITTY_MESSAGES[randomIndex];
          } while (nextText === prevText && WITTY_MESSAGES.length > 1);
          return nextText;
        });
      }, 2500);
    }
    return () => clearInterval(messageInterval);
  }, [isLoading]);

  useEffect(() => {
    let ignore = false;
    async function getData() {
      setIsLoading(true);
      try {
        const response = await fetch(url);

        // 응답이 성공인지 확인
        if (!response.ok) {
          throw new Error(`HTTP 오류! 상태 : ${response.status}`);
        }
        const data = await response.json();
        const items = data.response?.body?.items || [];
        if (!ignore) {
          setfestvs(items);
        }
      } catch (error) {
        if (!ignore) {
          console.log("에러 발생:", error.message);
        }
        return null;
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }
    getData();
    return () => {
      ignore = true;
    };
  }, []);

  // Check if festival has ended (compare with today)
  const isPastFestival = (dateString) => {
    if (!dateString) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to midnight for accurate comparison
    const festivalDate = new Date(dateString);
    return festivalDate < today;
  };

  const recommendRandomFestival = () => {
    if (festvs.length > 0) {
      // Filter for upcoming festivals only (exclude past ones)
      let upcomingFestivals = festvs.filter(
        (f) => !isPastFestival(f.fstvlStartDate),
      );

      // Apply month filter if selected
      if (selectedMonth) {
        upcomingFestivals = upcomingFestivals.filter(
          (f) => parseInt(f.fstvlStartDate.split("-")[1], 10) === selectedMonth,
        );
      }

      const sourceList =
        upcomingFestivals.length > 0 ? upcomingFestivals : festvs;
      const randomIndex = Math.floor(Math.random() * sourceList.length);
      setRandomFestival(sourceList[randomIndex]);
    }
  };

  const handleMonthSelect = (month) => {
    setSelectedMonth((prev) => (prev === month ? null : month));
  };

  const getMonth = (dateString) => {
    if (!dateString) return 0;
    return parseInt(dateString.split("-")[1], 10);
  };

  const handleCardClick = (festivalName) => {
    const searchQuery = encodeURIComponent(festivalName);
    const naverSearchUrl = `https://search.naver.com/search.naver?query=${searchQuery}`;
    window.open(naverSearchUrl, "_blank", "noopener,noreferrer");
  };

  // Sort festivals: upcoming first, past last
  const sortedFestivals = [...festvs].sort((a, b) => {
    const aIsPast = isPastFestival(a.fstvlStartDate);
    const bIsPast = isPastFestival(b.fstvlStartDate);

    // If one is past and one is not, put upcoming first
    if (aIsPast !== bIsPast) {
      return aIsPast ? 1 : -1;
    }

    // Within same category, sort by date
    const dateA = new Date(a.fstvlStartDate || "9999-12-31");
    const dateB = new Date(b.fstvlStartDate || "9999-12-31");
    return dateA - dateB;
  });

  // Apply month filter after sorting
  const filteredFestivals = selectedMonth
    ? sortedFestivals.filter(
        (f) => getMonth(f.fstvlStartDate) === selectedMonth,
      )
    : sortedFestivals;

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <h2 className={styles.festivalHeader}>국내 축제 리스트</h2>
      </div>

      {isLoading ? (
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p className={styles.loadingMessage}>{loadingMessage}</p>
        </div>
      ) : (
        <>
          <div className={styles.recommendSection}>
            <button
              className={styles.recommendButton}
              onClick={recommendRandomFestival}
            >
              {name ? `${name}님 어디로 가볼까요?` : "어디로 가볼까?"}
            </button>
            {randomFestival && (
              <div
                className={`${styles.festivalCard} ${styles.recommendCard} ${isPastFestival(randomFestival.fstvlStartDate) ? styles.past : ""}`}
                onClick={() => handleCardClick(randomFestival.fstvlNm)}
              >
                <h3 className={styles.festivalTitle}>
                  ✨ {randomFestival.fstvlNm}
                  {isPastFestival(randomFestival.fstvlStartDate) && (
                    <span className={styles.endedBadge}>종료</span>
                  )}
                </h3>
                <div className={styles.festivalInfo}>
                  <span className={styles.statusTag}>
                    📍{" "}
                    {randomFestival.rdnmadr?.split(" ")[0] || "Location info"}
                  </span>
                  <span className={styles.statusTag}>
                    🗓 {randomFestival.fstvlStartDate}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className={styles.monthFilterContainer}>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
              <div
                key={month}
                className={`${styles.filterDot} ${selectedMonth === month ? styles.active : ""}`}
                onClick={() => handleMonthSelect(month)}
                data-month={`${month}월`}
                title={`${month}월`}
              />
            ))}
          </div>

          <div className={styles.festivalList}>
            {filteredFestivals.length > 0 ? (
              filteredFestivals.map((festv, index) => {
                const isPast = isPastFestival(festv.fstvlStartDate);
                return (
                  <div
                    key={index}
                    className={`${styles.festivalCard} ${isPast ? styles.past : ""}`}
                    onClick={() => handleCardClick(festv.fstvlNm)}
                  >
                    <h3 className={styles.festivalTitle}>
                      {festv.fstvlNm}
                      {isPast && (
                        <span className={styles.endedBadge}>종료</span>
                      )}
                    </h3>
                    <div className={styles.festivalInfo}>
                      <span className={styles.statusTag}>
                        🗓 {festv.fstvlStartDate}
                      </span>
                      <span className={styles.statusTag}>
                        📍 {festv.rdnmadr?.split(" ")[0]}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <h2 className={styles.emptyState}>
                {selectedMonth
                  ? `${selectedMonth}월은 정보가 없네요 ${name}님..🧐 찾는대로 바로 업데이트 할게요.`
                  : "축제 정보가 없습니다."}
              </h2>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default FestivalList;
