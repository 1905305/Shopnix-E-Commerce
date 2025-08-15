import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main style={container}>
      {/* Video Banner */}
      <div style={videoWrapper}>
        <video
          style={video}
          src="/assets/Shopniccontact.mp4"
          autoPlay
          loop
          muted
        />
      </div>

      {/* Contact Form */}
      <div style={card}>
        <h1 style={title}>Contact Us</h1>
        <p style={desc}>Have questions? We’re here to help 24/7. Reach out anytime.</p>

        {submitted ? (
          <p style={successMsg}>
            Shopnix Team has received your message, we’ll try to get back to you soon.
          </p>
        ) : (
          <form onSubmit={handleSubmit} style={form} noValidate>
            <label style={label}>
              Name
              <input
                type="text"
                name="name"
                placeholder="Your full name"
                value={formData.name}
                onChange={handleChange}
                required
                style={input}
              />
            </label>

            <label style={label}>
              Email
              <input
                type="email"
                name="email"
                placeholder="Your email address"
                value={formData.email}
                onChange={handleChange}
                required
                style={input}
              />
            </label>

            <label style={label}>
              Message
              <textarea
                name="message"
                placeholder="How can we help you?"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                style={{ ...input, resize: 'vertical' }}
              />
            </label>

            <button type="submit" style={button}>Send Message</button>
          </form>
        )}
      </div>
    </main>
  );
};

// Styles
const container = {
  minHeight: 'calc(100vh - 140px)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '50px 16px 40px', // ✅ top padding = 50px
  backgroundColor: '#f6f8fa',
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
};

const videoWrapper = {
  width: 900, // ✅ fixed width
  height: 200, // ✅ fixed height
  marginBottom: 30,
  borderRadius: 8,
  overflow: 'hidden',
  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  paddingTop: '50px', // ✅ added padding to match navbar gap
};

const video = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
};

const card = {
  maxWidth: 480,
  width: '100%',
  padding: '32px 40px',
  backgroundColor: '#fff',
  borderRadius: 8,
  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  boxSizing: 'border-box',
};

const title = {
  fontSize: 28,
  fontWeight: '700',
  marginBottom: 12,
  color: '#111',
};

const desc = {
  fontSize: 15,
  marginBottom: 24,
  color: '#555',
};

const successMsg = {
  fontSize: 16,
  fontWeight: '600',
  color: '#2a7a2a',
  textAlign: 'center',
  marginTop: 20,
};

const form = {
  display: 'flex',
  flexDirection: 'column',
  gap: 20,
};

const label = {
  display: 'flex',
  flexDirection: 'column',
  fontSize: 14,
  fontWeight: '600',
  color: '#333',
};

const input = {
  marginTop: 8,
  padding: '12px 14px',
  fontSize: 15,
  borderRadius: 4,
  border: '1px solid #ccc',
  outline: 'none',
  fontFamily: 'inherit',
  transition: 'border-color 0.3s',
};

const button = {
  marginTop: 10,
  padding: '14px 0',
  fontSize: 16,
  fontWeight: '700',
  backgroundColor: '#2874f0',
  color: '#fff',
  border: 'none',
  borderRadius: 4,
  cursor: 'pointer',
  boxShadow: '0 4px 10px rgba(40, 116, 240, 0.5)',
  transition: 'background-color 0.3s ease',
};

export default Contact;

