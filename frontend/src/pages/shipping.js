import React from 'react';

const Shipping = () => {
  const deliveryOptions = [
    {
      title: 'Standard Delivery',
      time: '3-5 Business Days',
      price: 'Free above ₹500 / ₹50 below ₹500',
      icon: '🚚',
      bg: '#f0f8ff',
    },
    {
      title: 'Shopnix Express',
      time: '1-2 Business Days',
      price: '₹99 flat rate',
      icon: '⚡',
      bg: '#fff4e6',
    },
    {
      title: 'Same Day Delivery',
      time: 'Within 24 Hours (Metro Cities only)',
      price: '₹149 flat rate',
      icon: '⏱️',
      bg: '#e8ffe8',
    },
  ];

  return (
    <main style={container}>
      {/* Banner Image */}
      <div style={bannerWrapper}>
        <img
          src="/assets/shipping.png"
          alt="Shipping Banner"
          style={bannerImage}
        />
      </div>

      <h1 style={title}>Shipping Information</h1>
      <p style={text}>
        We deliver across India with multiple trusted courier partners. Most orders ship within 24 hours.
      </p>

      {/* Delivery Cards */}
      <div style={cardsWrapper}>
        {deliveryOptions.map((option, index) => (
          <div
            key={index}
            style={{
              ...card,
              backgroundColor: option.bg,
            }}
          >
            <div style={icon}>{option.icon}</div>
            <h2 style={cardTitle}>{option.title}</h2>
            <p style={cardTime}>{option.time}</p>
            <p style={cardPrice}>{option.price}</p>
          </div>
        ))}
      </div>

      {/* Extra Info */}
      <section style={section}>
        <h2 style={subtitle}>Shipping Times by Region</h2>
        <ul style={list}>
          <li>Metro Cities: 1-2 business days</li>
          <li>Other Cities: 3-5 business days</li>
          <li>Remote Areas: Up to 7 business days</li>
        </ul>
      </section>
    </main>
  );
};

// Styles
const container = {
  maxWidth: 900,
  margin: '40px auto',
  padding: '0 20px',
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  color: '#222',
};

const bannerWrapper = {
  width: '100%',
  maxWidth: 960,
  margin: '50px auto 30px',
  borderRadius: 8,
  overflow: 'hidden',
  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  paddingTop: 50, // Added padding top
};

const bannerImage = {
  width: '100%',
  height: 'auto',
  display: 'block',
};

const title = {
  fontSize: 32,
  fontWeight: '700',
  marginBottom: 16,
  textAlign: 'center',
  color: '#333',
};

const text = {
  fontSize: 16,
  lineHeight: 1.5,
  color: '#555',
  marginBottom: 30,
  textAlign: 'center',
};

const cardsWrapper = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: 20,
  marginBottom: 40,
};

const card = {
  borderRadius: 12,
  padding: '20px',
  textAlign: 'center',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  cursor: 'pointer',
  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
};
card[':hover'] = {
  transform: 'translateY(-5px)',
  boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
};

const icon = {
  fontSize: 40,
  marginBottom: 10,
};

const cardTitle = {
  fontSize: 20,
  fontWeight: '700',
  marginBottom: 6,
  color: '#333',
};

const cardTime = {
  fontSize: 16,
  color: '#555',
  marginBottom: 4,
};

const cardPrice = {
  fontSize: 16,
  fontWeight: '600',
  color: '#2874f0',
};

const section = {
  marginBottom: 24,
};

const subtitle = {
  fontSize: 20,
  fontWeight: '600',
  marginBottom: 12,
  color: '#333',
};

const list = {
  paddingLeft: 20,
  fontSize: 16,
  color: '#444',
};

export default Shipping;
