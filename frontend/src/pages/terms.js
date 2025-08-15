import React, { useState, useEffect } from "react";
import { FaUserShield, FaCreditCard, FaBan, FaBalanceScale } from "react-icons/fa";

const Terms = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setTimeout(() => setFadeIn(true), 100);
  }, []);

  const toggleSection = (index) => {
    setActiveSection(activeSection === index ? null : index);
  };

  const sections = [
    {
      title: "Account Responsibilities",
      icon: <FaUserShield style={iconStyle} />,
      content: [
        "You are responsible for maintaining your account credentials confidential.",
        "Notify us immediately of any unauthorized use."
      ]
    },
    {
      title: "Purchases & Payments",
      icon: <FaCreditCard style={iconStyle} />,
      content: [
        "All prices and availability are subject to change without notice.",
        "Payments are securely processed; refunds handled as per our policies."
      ]
    },
    {
      title: "Prohibited Activities",
      icon: <FaBan style={iconStyle} />,
      content: [
        "Any misuse of the site including fraud, unauthorized access, or violation of laws is prohibited.",
        "Such violations may result in account suspension."
      ]
    },
    {
      title: "Limitation of Liability",
      icon: <FaBalanceScale style={iconStyle} />,
      content: [
        "Shopnix will not be liable for indirect damages arising from your use of the site or services."
      ]
    }
  ];

  return (
    <main
      style={{
        ...containerStyle,
        opacity: fadeIn ? 1 : 0,
        transform: fadeIn ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.6s ease"
      }}
    >
      <h1 style={headingStyle}>
        <FaUserShield style={{ marginRight: 10, color: "#c19a6b" }} />
        Terms of Service
      </h1>
      <p style={introText}>
        By using Shopnix, you agree to the following terms. Please read carefully.
      </p>

      {sections.map((sec, i) => (
        <div key={i} style={sectionCardStyle}>
          <div
            style={sectionHeaderStyle}
            onClick={() => toggleSection(i)}
          >
            {sec.icon}
            <span>{sec.title}</span>
            <span style={{ marginLeft: "auto", fontSize: 20 }}>
              {activeSection === i ? "−" : "+"}
            </span>
          </div>
          {activeSection === i && (
            <div style={sectionContentStyle}>
              <ul style={listStyle}>
                {sec.content.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </main>
  );
};

const containerStyle = {
  maxWidth: 800,
  margin: "40px auto",
  padding: "20px",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  color: "#222",
  lineHeight: 1.6,
  backgroundColor: "#fff",
  borderRadius: 12,
  boxShadow: "0 8px 25px rgba(0,0,0,0.15)"
};

const headingStyle = {
  fontSize: 34,
  fontWeight: "700",
  marginBottom: 24,
  borderBottom: "3px solid #c19a6b",
  paddingBottom: 8,
  color: "#333",
  display: "flex",
  alignItems: "center"
};

const introText = {
  fontSize: 16,
  marginBottom: 20,
  color: "#555"
};

const sectionCardStyle = {
  background: "#fafafa",
  borderRadius: 8,
  marginBottom: 12,
  overflow: "hidden",
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  transition: "all 0.3s ease"
};

const sectionHeaderStyle = {
  display: "flex",
  alignItems: "center",
  padding: "14px 16px",
  cursor: "pointer",
  fontSize: 18,
  fontWeight: "600",
  color: "#444",
  background: "#f4f4f4",
  transition: "background 0.3s ease"
};

const sectionContentStyle = {
  padding: "12px 20px",
  animation: "fadeIn 0.4s ease"
};

const listStyle = {
  listStyleType: "disc",
  paddingLeft: 24,
  fontSize: 15,
  color: "#555"
};

const iconStyle = {
  marginRight: 10,
  color: "#c19a6b",
  fontSize: 20
};

export default Terms;
