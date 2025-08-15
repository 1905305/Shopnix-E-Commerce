import React, { useState, useEffect } from "react";
import { FaLock, FaUserShield, FaListAlt, FaCogs, FaUserCheck } from "react-icons/fa";

const Privacy = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setTimeout(() => setFadeIn(true), 100); // smooth fade-in
  }, []);

  const toggleSection = (index) => {
    setActiveSection(activeSection === index ? null : index);
  };

  const sections = [
    {
      title: "Information We Collect",
      icon: <FaListAlt style={iconStyle} />,
      content: [
        "Personal data like name, email, and address.",
        "Order and payment details.",
        "Browsing and usage information."
      ]
    },
    {
      title: "How We Use Your Information",
      icon: <FaCogs style={iconStyle} />,
      content: [
        "To process and deliver your orders smoothly.",
        "To improve our services and personalize your experience.",
        "To communicate important updates and offers."
      ]
    },
    {
      title: "Data Security",
      icon: <FaLock style={iconStyle} />,
      content: [
        "We use industry-standard security measures to protect your data.",
        "However, no system is completely foolproof."
      ]
    },
    {
      title: "Your Rights",
      icon: <FaUserCheck style={iconStyle} />,
      content: [
        "You can request access to, correction of, or deletion of your personal information anytime by contacting our support team."
      ]
    }
  ];

  return (
    <main style={{ ...containerStyle, opacity: fadeIn ? 1 : 0, transform: fadeIn ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s ease" }}>
      <h1 style={headingStyle}>
        <FaUserShield style={{ marginRight: 10, color: "#c19a6b" }} />
        Privacy Policy
      </h1>
      <p style={introText}>
        Your privacy is our priority. Shopnix is committed to protecting your personal information and being transparent about how we use it.
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
  boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
};

const headingStyle = {
  fontSize: 34,
  fontWeight: "700",
  marginBottom: 24,
  borderBottom: "3px solid #c19a6b",
  paddingBottom: 8,
  color: "#333",
  display: "flex",
  alignItems: "center",
};

const introText = {
  fontSize: 16,
  marginBottom: 20,
  color: "#555",
};

const sectionCardStyle = {
  background: "#fafafa",
  borderRadius: 8,
  marginBottom: 12,
  overflow: "hidden",
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  transition: "all 0.3s ease",
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
  transition: "background 0.3s ease",
};

const sectionContentStyle = {
  padding: "12px 20px",
  animation: "fadeIn 0.4s ease",
};

const listStyle = {
  listStyleType: "disc",
  paddingLeft: 24,
  fontSize: 15,
  color: "#555",
};

const paragraph = {
  fontSize: 15,
  color: "#555",
};

const iconStyle = {
  marginRight: 10,
  color: "#c19a6b",
  fontSize: 20,
};

export default Privacy;
