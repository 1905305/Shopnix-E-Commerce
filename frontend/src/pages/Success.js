// src/pages/Success.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Success = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        textAlign: 'center',
      }}
    >
      {/* Icons Row */}
      <div
        style={{
          display: 'flex',
          gap: '30px',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '30px',
        }}
      >
        {/* Order Confirmed Video */}
        <video
          src="/assets/orderConfirmed.mp4"
          autoPlay
          loop
          muted
          playsInline
          style={{ width: '180px', borderRadius: '12px' }}
        />

        {/* Delivery Truck GIF */}
        <img
          src="/assets/delivery-truck.gif"
          alt="Delivery Truck"
          style={{ width: '180px', borderRadius: '12px' }}
        />

        {/* Package Image */}
        <img
          src="/assets/package.png"
          alt="Package"
          style={{ width: '180px', borderRadius: '12px' }}
        />
      </div>

      {/* Check Icon */}
      <CheckCircleIcon style={{ fontSize: 70, color: '#16a34a', marginBottom: 20 }} />

      {/* Title */}
      <h1
        style={{
          fontSize: '2.75rem',
          fontWeight: 'bold',
          color: '#14b8a6',
          marginBottom: '10px',
        }}
      >
        Payment Successful
      </h1>

      {/* Message */}
      <p
        style={{
          fontSize: '1.3rem',
          color: '#14532d',
          maxWidth: '600px',
          marginBottom: '40px',
        }}
      >
        Thank you for your order! Your payment was successful and your package is on its way.
      </p>

      {/* Back to Home Button */}
      <Link
        to="/"
        style={{
          backgroundColor: 'rgb(255 255 255)',
          color: 'white',
          padding: '14px 36px',
          fontSize: '1rem',
          fontWeight: '600',
          borderRadius: '999px',
          textDecoration: 'none',
          transition: 'background-color 0.3s ease',
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = '#166534')}
        onMouseOut={(e) => (e.target.style.backgroundColor = '#15803d')}
      >
        Back to Home
      </Link>
    </div>
  );
};

export default Success;
