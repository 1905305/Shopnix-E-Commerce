import React, { useState } from 'react';

const Tracking = () => {
  const [trackingId, setTrackingId] = useState('');
  const [status, setStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!trackingId.trim()) return;
    setStatus(`Order ${trackingId.toUpperCase()} is currently in transit. Expected delivery in 2 days.`);
  };

  return (
    <main style={container}>
      {/* Banner */}
      <div style={bannerWrapper}>
        <img src="/assets/tracking.png" alt="Tracking Banner" style={bannerImage} />
      </div>

      {/* Tracking Form Card */}
      <div style={card}>
        <h2 style={title}>Track Your Order</h2>
        <form onSubmit={handleSubmit} style={form}>
          <input
            type="text"
            placeholder="Enter your tracking ID"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            required
            style={input}
          />
          <button type="submit" style={button}>Track</button>
        </form>
        {status && <p style={statusStyle}>{status}</p>}
      </div>
    </main>
  );
};

/* Styles */
const container = {
  fontFamily: "'Poppins', sans-serif",
  color: '#222',
  textAlign: 'center',
  paddingBottom: 50,
};

/* Banner */
const bannerWrapper = {
  position: 'relative',
  width: '100%',
  height: '280px',
  overflow: 'hidden',
  marginBottom: 40,
  paddingTop: '90px', // ✅ Added padding top
};

const bannerImage = {
  width: '100%',           // full width under navbar
  maxWidth: '900px',       // keep nice rectangle size
  height: 'auto',          // auto height to avoid cutting
  objectFit: 'contain',    // keeps entire image visible
  display: 'block',
  margin: '0 auto',        // center horizontally
};




/* Card */
const card = {
  background: '#fff',
  maxWidth: 500,
  margin: '0 auto',
  padding: '30px 20px',
  borderRadius: 12,
  boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
};

const title = {
  fontSize: 26,
  fontWeight: '700',
  marginBottom: 20,
  color: '#333',
};

const form = {
  display: 'flex',
  gap: 12,
  justifyContent: 'center',
  marginBottom: 20,
};

const input = {
  padding: '12px 16px',
  fontSize: 16,
  borderRadius: 8,
  border: '1px solid #ddd',
  outline: 'none',
  width: '60%',
  maxWidth: 280,
  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  transition: 'all 0.3s ease',
};

const button = {
  padding: '12px 24px',
  fontSize: 16,
  fontWeight: '700',
  backgroundColor: '#c19a6b',
  color: '#fff',
  border: 'none',
  borderRadius: 8,
  cursor: 'pointer',
  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  transition: 'all 0.3s ease',
};

const statusStyle = {
  fontSize: 16,
  fontWeight: '600',
  color: '#555',
  marginTop: 10,
};

export default Tracking;
