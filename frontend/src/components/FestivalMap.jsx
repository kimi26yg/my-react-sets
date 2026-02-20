import React, { useState, useEffect } from "react";
import {
  Map,
  MapMarker,
  CustomOverlayMap,
  MarkerClusterer,
} from "react-kakao-maps-sdk";
import styles from "./FestivalMap.module.css";

function FestivalMap({ festivals, handleCardClick }) {
  const [activeMarker, setActiveMarker] = useState(null);

  useEffect(() => {
    // Automatically open the marker if there's only one festival showing
    if (festivals.length === 1) {
      setActiveMarker(0);
    } else {
      setActiveMarker(null);
    }
  }, [festivals]);

  // Default center point: somewhere around central Korea
  const defaultCenter = { lat: 36.2683, lng: 127.6358 };

  const isSingleFestival = festivals.length === 1;
  const center =
    isSingleFestival && festivals[0].latitude && festivals[0].longitude
      ? {
          lat: parseFloat(festivals[0].latitude),
          lng: parseFloat(festivals[0].longitude),
        }
      : defaultCenter;

  const mapLevel = isSingleFestival ? 5 : 13;

  return (
    <div className={styles.mapContainer}>
      <Map
        center={center}
        style={{ width: "100%", height: "100%" }}
        level={mapLevel}
      >
        <MarkerClusterer averageCenter={true} minLevel={10}>
          {festivals.map((festival, index) => {
            const lat = parseFloat(festival.latitude);
            const lng = parseFloat(festival.longitude);
            if (!lat || !lng) return null; // Skip if no valid coordinates

            return (
              <MapMarker
                key={`${festival.fstvlNm}-${index}`}
                position={{ lat, lng }}
                onClick={() => setActiveMarker(index)}
              />
            );
          })}
        </MarkerClusterer>

        {/* Render overlay for the active marker */}
        {activeMarker !== null && festivals[activeMarker] && (
          <CustomOverlayMap
            position={{
              lat: parseFloat(festivals[activeMarker].latitude),
              lng: parseFloat(festivals[activeMarker].longitude),
            }}
            yAnchor={1.2} // Offset above the marker
            zIndex={10}
          >
            <div className={styles.infoWindow}>
              <button
                className={styles.closeBtn}
                onClick={() => setActiveMarker(null)}
              >
                &times;
              </button>
              <div
                className={styles.infoContent}
                onClick={() => handleCardClick(festivals[activeMarker].fstvlNm)}
              >
                <h4>{festivals[activeMarker].fstvlNm}</h4>
                <p>📍 {festivals[activeMarker].rdnmadr?.split(" ")[0]}</p>
                <p>🗓 {festivals[activeMarker].fstvlStartDate}</p>
                <span className={styles.detailLink}>자세히 보기 &gt;</span>
              </div>
            </div>
          </CustomOverlayMap>
        )}
      </Map>
    </div>
  );
}

export default FestivalMap;
