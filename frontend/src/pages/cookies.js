import React, { useState, useEffect } from "react";
import { FaCookieBite, FaListUl, FaCogs, FaSlidersH } from "react-icons/fa";

const Cookies = () => {
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
      title: "What Are Cookies?",
      icon: <FaCookieBite style={iconStyle} />,
      content: [
        "Cookies are small text files stored on your device that help websites remember your preferences and improve functionality."
      ]
    },
    {
      title: "How We Use Cookies",
      icon: <FaListUl style={iconStyle} />,
      content: [
        "To remember your login and preferences.",
        "To analyze site traffic and performance.",
        "To serve personalized ads and promotions."
      ]
    },
    {
      title: "Managing Cookies",
      icon: <FaSlidersH style={iconStyle} />,
      content: [
        "You can control or disable cookies via your browser settings, but this may affect site functionality."
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
        <FaCookieBite style={{ marginRight: 10, color: "#c19a6b" }} />
        Cookie Policy
      </h1>
      <p style={introText}>
        Shopnix uses cookies and similar technologies to enhance your shopping experience.
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
              {sec.content.length > 1 ? (
                <ul style={listStyle}>
                  {sec.content.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p style={paragraph}>{sec.content[0]}</p>
              )}
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

const paragraph = {
  fontSize: 15,
  color: "#555"
};

const iconStyle = {
  marginRight: 10,
  color: "#c19a6b",
  fontSize: 20
};

export default Cookies;
