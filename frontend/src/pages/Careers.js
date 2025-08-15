import React, { useState } from 'react';

const Careers = () => {
  return (
    <main style={containerStyle}>
      <h1 style={headingStyle}>Careers at Shopnix</h1>
      <p style={textStyle}>
        At Shopnix, we’re building more than just an ecommerce platform — we’re crafting an experience.
        If you thrive in fast-paced environments, think outside the box, and deliver clean, scalable solutions,
        we’d love to hear from you.
      </p>

      {/* Why Work With Us Section */}
      <section style={sectionStyle}>
        <h2 style={subheadingStyle}>Why Work With Us</h2>
        <div style={gridStyle}>
          {[
            {
              title: 'Cutting-Edge Tech',
              desc: 'We work with the latest tools and frameworks to stay ahead in innovation.',
            },
            {
              title: 'Creative Freedom',
              desc: 'Your ideas matter — we encourage experimentation and ownership.',
            },
            {
              title: 'Team Spirit',
              desc: 'We believe in collaboration, mentorship, and shared success.',
            },
            {
              title: 'Real Impact',
              desc: 'Build products that reach thousands and truly make a difference.',
            },
          ].map((item, idx) => (
            <div key={idx} style={cardStyle} className="career-card">
              <h3 style={{ marginBottom: 8 }}>{item.title}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.5 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Open Positions */}
      <section style={sectionStyle}>
        <h2 style={subheadingStyle}>Open Positions</h2>
        <p style={{ fontSize: 16, color: '#555', lineHeight: 1.5 }}>
          We don’t have any openings at the moment, but we’re always excited to meet talented people.
          Subscribe to our newsletter and we’ll let you know when new opportunities come up.
        </p>
      </section>

      {/* Newsletter */}
      <section style={sectionStyle}>
        <h2 style={subheadingStyle}>Stay Ahead</h2>
        <p style={textStyle}>
          Subscribe to our newsletter for updates, job alerts, and more.
        </p>
        <NewsletterSubscribe />
      </section>

      {/* Inline Hover CSS */}
      <style>
        {`
          .career-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .career-card:hover {
            transform: translateY(-5px) scale(1.02);
            box-shadow: 0 8px 20px rgba(0,0,0,0.4);
          }
        `}
      </style>
    </main>
  );
};

const NewsletterSubscribe = () => {
  const [email, setEmail] = React.useState('');
  const [subscribed, setSubscribed] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubscribed(true);
  };

  return subscribed ? (
    <p style={{ color: '#c19a6b' }}>You’re on the list. Stay tuned.</p>
  ) : (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8, maxWidth: 400 }}>
      <input
        type="email"
        placeholder="Your email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        style={{ ...inputStyle, flexGrow: 1 }}
      />
      <button type="submit" style={buttonStyle}>Subscribe</button>
    </form>
  );
};

const containerStyle = {
  maxWidth: 900,
  margin: '40px auto',
  padding: '0 16px',
  fontFamily: 'sans-serif',
  color: '#222',
};

const headingStyle = {
  fontSize: 32,
  fontWeight: '700',
  marginBottom: 12,
};

const subheadingStyle = {
  fontSize: 24,
  fontWeight: '600',
  marginBottom: 16,
};

const textStyle = {
  fontSize: 16,
  lineHeight: 1.5,
  marginBottom: 20,
};

const sectionStyle = {
  marginBottom: 40,
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: 20,
};

const cardStyle = {
  backgroundColor: '#000000',
  color: '#ffffff',
  padding: 20,
  borderRadius: 8,
  textAlign: 'left',
};

const inputStyle = {
  padding: '10px 12px',
  fontSize: 16,
  borderRadius: 4,
  border: '1px solid #ccc',
  outline: 'none',
};

const buttonStyle = {
  padding: '10px 16px',
  fontSize: 16,
  fontWeight: '600',
  borderRadius: 4,
  border: 'none',
  backgroundColor: '#000000',
  color: '#fff',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
};

export default Careers;
