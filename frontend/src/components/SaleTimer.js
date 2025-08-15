import React, { useEffect, useState } from "react";

const SaleTimer = () => {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());

  function getTimeRemaining() {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    const distance = midnight.getTime() - now.getTime();

    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (distance % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    return { hours, minutes, seconds };
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const boxStyle = {
    background: "#111",
    padding: "20px 30px",
    borderRadius: "14px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "95%",
    maxWidth: "2000px",
    height: "130px",
    color: "#fff",
    fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
    margin: "40px auto",
  };

  const iconColor = "#FFD700";

  return (
    <div style={boxStyle}>
      {/* Sale Label */}
      <div style={{ fontSize: "26px", fontWeight: "bold", display: "flex", alignItems: "center", gap: "10px" }}>
        {/* SVG tag icon */}
        {/* <svg xmlns="http://www.w3.org/2000/svg" fill={iconColor} viewBox="0 0 24 24" width="32" height="32">
          <path d="M22,12l-1.41,1.41L13,5.83V21H11V5.83L3.41,13.41L2,12l10-10L22,12z" />
        </svg> */}
        Shopnix Great Festive Sale Ends In:
      </div>

      {/* Timer Display */}
      <div style={{ display: "flex", gap: "25px", fontSize: "22px", fontWeight: "bold", alignItems: "center" }}>
        {/* Hour */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill={iconColor} viewBox="0 0 24 24" width="20" height="20">
            <path d="M12 20c4.41 0 8-3.59 8-8s-3.59-8-8-8-8 
            3.59-8 8 3.59 8 8 8zm0-18c5.52 0 10 
            4.48 10 10s-4.48 10-10 10S2 17.52 2 
            12 6.48 2 12 2zm-.5 5h1v5.25l4.5 
            2.67-.5.87L11.5 13V7z"/>
          </svg>
          {timeLeft.hours}h
        </div>

        {/* Minute */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill={iconColor} viewBox="0 0 24 24" width="20" height="20">
            <path d="M12 20c4.41 0 8-3.59 8-8s-3.59-8-8-8-8 
            3.59-8 8 3.59 8 8 8zm0-18c5.52 0 10 
            4.48 10 10s-4.48 10-10 10S2 17.52 2 
            12 6.48 2 12 2zm-.5 5h1v5.25l4.5 
            2.67-.5.87L11.5 13V7z"/>
          </svg>
          {timeLeft.minutes}m
        </div>

        {/* Second */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill={iconColor} viewBox="0 0 24 24" width="20" height="20">
            <path d="M6 2v2h1v3c0 
            1.38.56 2.63 1.46 3.54L10 12l-1.54 
            1.46C7.56 14.37 7 15.62 7 
            17v3H6v2h12v-2h-1v-3c0-1.38-.56-2.63-1.46-3.54L14 
            12l1.54-1.46C16.44 9.63 17 8.38 17 
            7V4h1V2H6zm3 2h6v3c0 .83-.33 
            1.58-.88 2.12L13 10h-2l-1.12-.88A2.99 
            2.99 0 0 1 9 7V4zm0 10.88L10 14h4l1 
            .88c.55.54.88 1.29.88 2.12v3H9v-3c0-.83.33-1.58.88-2.12z"/>
          </svg>
          {timeLeft.seconds}s
        </div>
      </div>

      {/* Shop Now Button */}
      <button style={{
        background: "#FFD700",
        color: "#000",
        padding: "12px 22px",
        fontSize: "16px",
        fontWeight: "bold",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        transition: "0.3s ease",
        display: "flex",
        alignItems: "center",
        gap: "8px"
      }}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="black" width="18" height="18" viewBox="0 0 24 24">
          <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 
          0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2zM7.16 
          12l-.94-2h11.45l-1.38 4H7.16zM18.31 6H6.59L5.27 
          2.59C5.11 2.22 4.73 2 4.3 2H2v2h1.61l3.59 7.59-.93 
          2.36C5.17 14.41 5.58 15 6.12 15h12.24c.53 0 .94-.59.74-1.15L18.31 
          6z"/>
        </svg>
        Shop Now
      </button>
    </div>
  );
};

export default SaleTimer;
