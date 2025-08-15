import React from 'react';
import { Link } from 'react-router-dom';

const Cancel = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#ffffff', // changed to pure white
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        textAlign: 'center',
      }}
    >
      {/* Heading */}
      <h1
        style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          color: '#b91c1c',
          marginBottom: '20px',
        }}
      >
        Payment Cancelled ❌
      </h1>

      {/* Videos */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '30px',
          marginBottom: '30px',
        }}
      >
        <video
          src="/assets/cancelanimation.mp4"
          autoPlay
          loop
          muted
          style={{ width: '180px', borderRadius: '12px' }}
        />
        <video
          src="/assets/emptycart.mp4"
          autoPlay
          loop
          muted
          style={{ width: '180px', borderRadius: '12px' }}
        />
        <video
          src="/assets/paymentfailed.mp4"
          autoPlay
          loop
          muted
          style={{ width: '180px', borderRadius: '12px' }}
        />
      </div>

      {/* Message */}
      <p
        style={{
          fontSize: '1.2rem',
          color: '#7f1d1d',
          maxWidth: '500px',
          marginBottom: '30px',
        }}
      >
        Your payment wasn't completed. You can return to your cart to try again or head back to the homepage.
      </p>

      {/* Buttons */}
      <div style={{ display: 'flex', gap: '20px' }}>
        <Link
          to="/cart"
          style={{
            backgroundColor: '#dc2626',
            color: 'white',
            padding: '12px 24px',
            fontSize: '1rem',
            fontWeight: '600',
            borderRadius: '999px',
            textDecoration: 'none',
            transition: 'background-color 0.3s ease',
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#b91c1c')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#dc2626')}
        >
          Return to Cart
        </Link>

        <Link
          to="/"
          style={{
            backgroundColor: 'rgb(255 255 255)',
            color: 'white',
            padding: '12px 24px',
            fontSize: '1rem',
            fontWeight: '600',
            borderRadius: '999px',
            textDecoration: 'none',
            transition: 'background-color 0.3s ease',
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#1e293b')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#334155')}
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Cancel;
