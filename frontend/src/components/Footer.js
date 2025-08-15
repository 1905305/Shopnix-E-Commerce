import React from 'react';
import { Link } from 'react-router-dom';
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
        <FooterColumn
          title="Company"
          links={['About', 'Careers', 'Blog', 'Contact']}
          linkOverrides={{
            About: <Link style={linkStyle} to="/about">About</Link>,
            Careers: <Link style={linkStyle} to="/careers">Careers</Link>,
            Blog: <Link style={linkStyle} to="/blog">Blog</Link>,
            Contact: <Link style={linkStyle} to="/contact">Contact</Link>,
          }}
        />

        <FooterColumn
          title="Help"
          links={['FAQs', 'Shipping', 'Returns', 'Tracking']}
          linkOverrides={{
            FAQs: <Link style={linkStyle} to="/faqs">FAQs</Link>,
            Shipping: <Link style={linkStyle} to="/shipping">Shipping</Link>,
            Returns: <Link style={linkStyle} to="/returns">Returns</Link>,
            Tracking: <Link style={linkStyle} to="/tracking">Tracking</Link>,
          }}
        />

        <FooterColumn
          title="Legal"
          links={['Privacy', 'Terms', 'Cookies']}
          linkOverrides={{
            Privacy: <Link style={linkStyle} to="/privacy">Privacy</Link>,
            Terms: <Link style={linkStyle} to="/terms">Terms</Link>,
            Cookies: <Link style={linkStyle} to="/cookies">Cookies</Link>,
          }}
        />

        <FooterColumn
          title="Shop"
          links={['All', 'New Arrivals', 'Best Sellers']}
          linkOverrides={{
            All: <Link key="all" style={linkStyle} to="/">All</Link>,
            'New Arrivals': <Link style={linkStyle} to="/new-arrivals">New Arrivals</Link>,
            'Best Sellers': <Link style={linkStyle} to="/best-sellers">Best Sellers</Link>,
          }}
        />

        {/* Social Icons */}
        <div>
          <h4 style={titleStyle}>Follow Us</h4>
          <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
            <a
              href="https://www.instagram.com/anish_xavier50?igsh=ODdyazN6Z2EyMG9y"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#ccc', fontSize: '18px', transition: 'color 0.3s' }}
              onMouseOver={e => (e.currentTarget.style.color = '#c19a6b')}
              onMouseOut={e => (e.currentTarget.style.color = '#ccc')}
            >
              <FaInstagram />
            </a>

            <a
              href="https://www.facebook.com/anish.xalxo.3/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#ccc', fontSize: '18px', transition: 'color 0.3s' }}
              onMouseOver={e => (e.currentTarget.style.color = '#c19a6b')}
              onMouseOut={e => (e.currentTarget.style.color = '#ccc')}
            >
              <FaFacebookF />
            </a>

            <a
              href="https://www.linkedin.com/in/anish-xavier-xalxo/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#ccc', fontSize: '18px', transition: 'color 0.3s' }}
              onMouseOver={e => (e.currentTarget.style.color = '#c19a6b')}
              onMouseOut={e => (e.currentTarget.style.color = '#ccc')}
            >
              <FaLinkedinIn />
            </a>

            {/* Keep Twitter and Youtube icons if you want them as placeholders or remove if not needed */}
            <FaTwitter
              style={{ color: '#ccc', fontSize: '18px', cursor: 'default', opacity: 0.3 }}
              title="Twitter (not linked)"
            />
            <FaYoutube
              style={{ color: '#ccc', fontSize: '18px', cursor: 'default', opacity: 0.3 }}
              title="YouTube (not linked)"
            />
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

const FooterColumn = ({ title, links, linkOverrides = {} }) => (
  <div>
    <h4 style={titleStyle}>{title}</h4>
    <ul style={{ listStyle: 'none', padding: 0, margin: 0, lineHeight: '1.8' }}>
      {links.map((text, i) => (
        <li key={i}>
          {linkOverrides[text] ? (
            linkOverrides[text]
          ) : (
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
          )}
        </li>
      ))}
    </ul>
  </div>
);

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

const linkStyle = {
  color: '#ccc',
  textDecoration: 'none',
  cursor: 'pointer',
  font: 'inherit',
  transition: 'color 0.3s',
};

export default Footer;
