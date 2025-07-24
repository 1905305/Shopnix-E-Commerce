import React, { useState } from 'react';

const CategoryCard = ({ name, image }) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: 240,
        height: 300,
        background: '#1a1a1a', // dark base
        border: hover ? '1px solid #c19a6b' : '1px solid #333', // brown on hover
        borderRadius: 12,
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease, border 0.3s ease',
        transform: hover ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hover
          ? '0 12px 30px rgba(255, 255, 255, 0.08)'
          : '0 2px 8px rgba(0,0,0,0.3)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        color: '#f5f5f5',
      }}
    >
      <img
        src={image}
        alt={name}
        style={{
          width: '100%',
          height: 180,
          objectFit: 'cover',
          borderBottom: '1px solid #444',
        }}
      />
      <div
        style={{
          padding: '16px',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <h4
          style={{
            margin: 0,
            fontSize: 17,
            fontWeight: 600,
            lineHeight: '1.4',
            color: hover ? '#c19a6b' : '#fff', // brown on hover
            transition: 'color 0.3s ease',
          }}
        >
          {name}
        </h4>
      </div>
    </div>
  );
};

export default CategoryCard;
