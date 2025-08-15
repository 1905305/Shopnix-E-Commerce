import React, { useState, useEffect, useCallback } from "react";

const MidnightTimer = () => {
  const [countDownTime, setCountDownTime] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  const getTimeUntilMidnight = (targetTime) => {
    const now = new Date().getTime();
    const timeLeft = targetTime - now;

    if (timeLeft < 0) {
      setCountDownTime({
        hours: "00",
        minutes: "00",
        seconds: "00",
      });
      return;
    }

    const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
    const seconds = Math.floor((timeLeft / 1000) % 60);

    setCountDownTime({
      hours: hours < 10 ? `0${hours}` : `${hours}`,
      minutes: minutes < 10 ? `0${minutes}` : `${minutes}`,
      seconds: seconds < 10 ? `0${seconds}` : `${seconds}`,
    });
  };

  const startCountdown = useCallback(() => {
    const now = new Date();
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0);

    const interval = setInterval(() => {
      getTimeUntilMidnight(midnight.getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const cleanup = startCountdown();
    return cleanup;
  }, [startCountdown]);

  return (
    <div style={{ background: "#000", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", padding: "2rem" }}>
      <div style={{
        background: "#111",
        color: "#fff",
        padding: "3rem 2rem",
        borderRadius: "12px",
        textAlign: "center",
        maxWidth: "700px",
        width: "100%",
        boxShadow: "0 0 20px rgba(255,255,255,0.1)"
      }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "1rem", fontWeight: "bold" }}>
          Shopnix Great Festive Sales Ends
        </h1>
        <p style={{ fontSize: "1.1rem", marginBottom: "2rem" }}>
          Great promotions, save up to 35%! Only for a short time!
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginBottom: "2rem" }}>
          {[
            { label: "HOURS", value: countDownTime.hours },
            { label: "MINUTES", value: countDownTime.minutes },
            { label: "SECONDS", value: countDownTime.seconds },
          ].map((item, idx) => (
            <div key={idx} style={{ textAlign: "center" }}>
              <div style={{
                background: "#000",
                padding: "1rem 1.2rem",
                borderRadius: "8px",
                fontSize: "2rem",
                fontWeight: "bold",
                border: "2px solid #fff",
                minWidth: "80px"
              }}>
                {item.value}
              </div>
              <div style={{ marginTop: "0.5rem", fontSize: "0.9rem", letterSpacing: "1px", color: "#ccc" }}>
                {item.label}
              </div>
            </div>
          ))}
        </div>

        <button style={{
          background: "#FFD700",
          color: "#000",
          fontSize: "1rem",
          fontWeight: "bold",
          padding: "0.75rem 1.5rem",
          borderRadius: "6px",
          border: "none",
          cursor: "pointer"
        }}>
          SHOP NOW
        </button>
      </div>
    </div>
  );
};

export default MidnightTimer;
