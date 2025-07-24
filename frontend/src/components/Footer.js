import React from 'react';
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaLinkedinIn,
  FaShieldAlt,
  FaCheckCircle,
  FaGlobe,
  FaMapMarkerAlt,
  FaRupeeSign,
  FaCode,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer
      style={{
        background: '#0e0e0e',
        padding: '30px 16px 20px',
        color: '#ccc',
        fontFamily: 'sans-serif',
        fontSize: '14px',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '24px',
          maxWidth: '1100px',
          margin: '0 auto',
        }}
      >
        <FooterColumn title="Company" links={['About', 'Careers', 'Blog', 'Contact']} />
        <FooterColumn title="Help" links={['FAQs', 'Shipping', 'Returns', 'Tracking']} />
        <FooterColumn title="Legal" links={['Privacy', 'Terms', 'Cookies']} />
        <FooterColumn title="Shop" links={['All', 'New Arrivals', 'Best Sellers']} />

        {/* Social Icons */}
        <div>
          <h4 style={titleStyle}>Follow Us</h4>
          <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
            {[FaInstagram, FaFacebookF, FaTwitter, FaYoutube, FaLinkedinIn].map((Icon, i) => (
              <Icon
                key={i}
                style={{
                  color: '#ccc',
                  fontSize: '18px',
                  cursor: 'pointer',
                  transition: 'color 0.3s',
                }}
                onMouseOver={(e) => (e.currentTarget.style.color = '#c19a6b')}
                onMouseOut={(e) => (e.currentTarget.style.color = '#ccc')}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div style={{ maxWidth: '1100px', margin: '30px auto 0' }}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '20px',
            borderTop: '1px solid #222',
            paddingTop: '20px',
            fontSize: '13px',
            color: '#999',
          }}
        >
          {/* Payment Image */}
          <div>
            <img
              src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/payment-method-c454fb.svg"
              alt="Accepted Payments"
              style={{ height: '30px', objectFit: 'contain' }}
            />
          </div>

          {/* Security */}
          <div style={{ display: 'flex', gap: '18px', alignItems: 'center', flexWrap: 'wrap' }}>
            <SecureIcon icon={<FaShieldAlt />} text="SSL Secured" />
            <SecureIcon icon={<FaCheckCircle />} text="Trusted Store" />
          </div>
        </div>

        {/* Language & Info */}
        <div
          style={{
            marginTop: '20px',
            fontSize: '13px',
            color: '#aaa',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <FaGlobe /> Language: English <FaRupeeSign /> INR
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <FaCode /> Shopnix — Personal Project. Built by Anish Xalxo
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <FaMapMarkerAlt /> Madhapur, Hyderabad
          </span>
        </div>

        <p
          style={{
            textAlign: 'center',
            fontSize: '12px',
            marginTop: '25px',
            color: '#777',
          }}
        >
          © 2025 Anish Xalxo. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

// Reusable Footer Column
const FooterColumn = ({ title, links }) => (
  <div>
    <h4 style={titleStyle}>{title}</h4>
    <ul style={{ listStyle: 'none', padding: 0, margin: 0, lineHeight: '1.8' }}>
      {links.map((text, i) => (
        <li key={i}>
          <button
            onClick={() => {}}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              margin: 0,
              font: 'inherit',
              color: '#ccc',
              cursor: 'pointer',
              transition: 'color 0.3s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = '#c19a6b')}
            onMouseOut={(e) => (e.currentTarget.style.color = '#ccc')}
          >
            {text}
          </button>
        </li>
      ))}
    </ul>
  </div>
);

// Trust Icon
const SecureIcon = ({ icon, text }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#888', fontSize: '13px' }}>
    {icon} <span>{text}</span>
  </div>
);

const titleStyle = {
  color: '#fff',
  marginBottom: '8px',
  fontSize: '15px',
  fontWeight: 600,
};

export default Footer;
