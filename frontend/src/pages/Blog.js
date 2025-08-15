import React, { useState } from 'react';

const ExpandableBlog = () => {
  const posts = [
    {
      id: 1,
      title: 'How Shopnix Simplifies Your Shopping Experience',
      date: 'Aug 1, 2025',
      summary: 'Discover the tech and design powering seamless shopping on Shopnix.',
      content:
        'At Shopnix, we focus on fast UI, reliable backend, and seamless checkout flows. Our platform is designed to remove friction and let you shop with confidence and ease.',
    },
    {
      id: 2,
      title: 'Top 5 Features to Look for in Online Stores',
      date: 'July 15, 2025',
      summary: 'Learn what makes an e-commerce platform reliable, secure, and fast.',
      content:
        'Security, speed, ease of navigation, transparent shipping, and great customer support are key. Shopnix nails all these and keeps innovating every day.',
    },
    {
      id: 3,
      title: 'Why Fast Shipping Matters More Than Ever',
      date: 'July 1, 2025',
      summary: 'How Shopnix ensures your orders reach you quickly and safely every time.',
      content:
        'In today’s market, fast shipping is a game changer. Shopnix partners with trusted couriers and uses smart logistics to get your package delivered lightning fast.',
    },
  ];

  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <main style={container}>
      {/* ✅ Main Blog Banner Image */}
      <img
        src="/assets/shopnixblog.png"
        alt="Shopnix Blog Banner"
        style={bannerImage}
      />

      <h1 style={header}>Shopnix Blog</h1>
      <p style={subtitle}>Smart shopping starts with smart insights.</p>

      <section style={cardContainer}>
        {posts.map(({ id, title, date, summary, content }) => (
          <article key={id} style={card}>
            <h2 style={titleStyle}>{title}</h2>
            <time style={dateStyle}>{date}</time>
            <p style={summaryStyle}>{summary}</p>

            {expandedId === id && <p style={contentStyle}>{content}</p>}

            <button
              onClick={() => toggleExpand(id)}
              style={buttonStyle}
              aria-expanded={expandedId === id}
              aria-controls={`post-content-${id}`}
            >
              {expandedId === id ? 'Read Less' : 'Read More'}
            </button>
          </article>
        ))}
      </section>
    </main>
  );
};

const container = {
  maxWidth: 800,
  margin: '60px auto',
  padding: '0 24px',
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  color: '#222',
};

const bannerImage = {
  width: '100%',
  height: '250px',
  objectFit: 'cover',
  borderRadius: '8px',
  marginBottom: '24px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  paddingTop: '50px'
};

const header = {
  fontSize: 36,
  fontWeight: '800',
  marginBottom: 12,
  borderBottom: '3px solid #c19a6b',
  paddingBottom: 8,
};

const subtitle = {
  fontSize: 18,
  fontWeight: '600',
  fontStyle: 'italic',
  color: '#c19a6b',
  marginBottom: 36,
  userSelect: 'none',
};

const cardContainer = {
  display: 'flex',
  flexDirection: 'column',
  gap: 28,
};

const card = {
  border: '1px solid #ddd',
  borderRadius: 8,
  padding: 24,
  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  backgroundColor: '#fff',
  transition: 'box-shadow 0.3s ease',
};

const titleStyle = {
  fontSize: 24,
  fontWeight: '700',
  marginBottom: 6,
  color: '#333',
};

const dateStyle = {
  fontSize: 14,
  color: '#999',
  marginBottom: 14,
  display: 'block',
  fontWeight: '500',
};

const summaryStyle = {
  fontSize: 16,
  lineHeight: 1.55,
  color: '#444',
  marginBottom: 18,
};

const contentStyle = {
  fontSize: 15,
  lineHeight: 1.6,
  color: '#555',
  marginBottom: 18,
};

const buttonStyle = {
  backgroundColor: '#000000',
  color: '#fff',
  border: 'none',
  padding: '10px 22px',
  fontSize: 15,
  fontWeight: '700',
  borderRadius: 6,
  cursor: 'pointer',
  boxShadow: '0 4px 10px rgba(193, 154, 107, 0.4)',
  transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
};

export default ExpandableBlog;
