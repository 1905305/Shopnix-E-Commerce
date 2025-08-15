import React, { useState } from 'react';
import { FaChevronDown, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const returnItems = [
  { name: 'Clothing', returnable: true },
  { name: 'Footwear', returnable: true },
  { name: 'Lingerie & Undergarments', returnable: false, note: 'Once tried, cannot be returned' },
  { name: 'Accessories', returnable: true },
];

const Returns = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleDropdown = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main style={container}>
      <img src="/assets/return.png" alt="Returns" style={image} />
      <h1 style={title}>Returns & Refunds</h1>
      <p style={intro}>
        Shop confidently. Most products are returnable within 10 days. Certain intimate items cannot be returned once tested.
      </p>

      <section style={cardsContainer}>
        {returnItems.map((item, index) => (
          <div key={index} style={card}>
            <div style={cardHeader} onClick={() => toggleDropdown(index)}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {item.returnable ? <FaCheckCircle color="#28a745" /> : <FaTimesCircle color="#dc3545" />}
                {item.name}
              </span>
              <FaChevronDown style={{ transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)', transition: '0.3s' }} />
            </div>
            {openIndex === index && (
              <div style={dropdown}>
                {item.returnable
                  ? 'This item can be returned within 10 days of delivery in original, unused condition.'
                  : item.note}
              </div>
            )}
          </div>
        ))}
      </section>

      <section style={section}>
        <h2 style={subtitle}>Refund Process</h2>
        <p style={text}>
          Once we receive your return, refunds are processed within 5-7 business days via your original payment method. Track your refunds in your account dashboard.
        </p>
      </section>
    </main>
  );
};

const container = {
  maxWidth: 800,
  margin: '40px auto',
  padding: '0 20px',
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  color: '#222',
};

const image = {
  display: 'block',
  width: '100%',      // full width
  maxWidth: '970px',  // optional max width
  height: '270px',    // increased height
  objectFit: 'cover', // ensures image covers the box without stretching
  margin: '60px auto 20px', // top padding 60px and bottom 20px
  borderRadius: '12px',      // optional rounded corners
  paddingTop: '60px', // added padding top
};


const title = {
  fontSize: 36,
  fontWeight: '700',
  marginBottom: 16,
  textAlign: 'center',
  color: '#6f42c1',
};

const intro = {
  fontSize: 17,
  lineHeight: 1.6,
  marginBottom: 32,
  textAlign: 'center',
  color: '#555',
};

const cardsContainer = {
  display: 'grid',
  gap: '20px',
  marginBottom: 40,
};

const card = {
  border: '2px solid #ddd',
  borderRadius: 12,
  overflow: 'hidden',
  boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
  transition: 'transform 0.3s',
  cursor: 'pointer',
};

const cardHeader = {
  backgroundColor: '#f8f9fa',
  padding: '16px 20px',
  fontSize: 18,
  fontWeight: 600,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const dropdown = {
  padding: '16px 20px',
  backgroundColor: '#fff',
  fontSize: 16,
  color: '#444',
  borderTop: '1px solid #eee',
  animation: 'fadeIn 0.3s ease',
};

const section = {
  marginBottom: 24,
};

const subtitle = {
  fontSize: 22,
  fontWeight: '600',
  marginBottom: 12,
  color: '#333',
};

const text = {
  fontSize: 16,
  lineHeight: 1.5,
  color: '#444',
};

export default Returns;
