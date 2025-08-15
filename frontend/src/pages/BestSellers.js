import React, { useState } from 'react';

const products = [
  {
    id: 1,
    name: 'Smartphone XYZ Pro',
    description: 'A powerful smartphone with stunning display and amazing camera performance.',
    price: '₹24,999',
    image: 'https://m.media-amazon.com/images/I/41vS8r-oc0L._SX300_SY300_QL70_FMwebp_.jpg',
  },
  {
    id: 2,
    name: 'Ultra HD 65” TV',
    description: 'Experience cinema-quality visuals with this ultra HD smart TV.',
    price: '₹54,999',
    image: 'https://m.media-amazon.com/images/I/81n4nsUQclL._SX679_.jpg',
  },
  {
    id: 3,
    name: 'Wireless Earbuds Plus',
    description: 'Comfortable earbuds with long battery life and clear sound quality.',
    price: '₹3,299',
    image: 'https://m.media-amazon.com/images/I/31hXqtvutdL._SX300_SY300_QL70_FMwebp_.jpg',
  },
  {
    id: 4,
    name: 'Gaming Laptop ZX-15',
    description: 'High-performance gaming laptop with fast GPU and RGB keyboard.',
    price: '₹74,999',
    image: 'https://m.media-amazon.com/images/I/41x+PdMIXgL._SY300_SX300_.jpg',
  },
  {
    id: 5,
    name: 'Smartwatch Series 5',
    description: 'Track your health and notifications with this sleek smartwatch.',
    price: '₹12,499',
    image: 'https://m.media-amazon.com/images/I/414WIlQMvaL._SX300_SY300_QL70_FMwebp_.jpg',
  },
  {
    id: 6,
    name: 'Bluetooth Speaker Max',
    description: 'Loud and clear portable speaker with deep bass.',
    price: '₹2,199',
    image: 'https://m.media-amazon.com/images/I/71euefPxbnL._SX679_.jpg',
  },
];

// Image with zoom on hover
const HoverImage = ({ src, alt, style }) => {
  const [hover, setHover] = useState(false);
  return (
    <img
      src={src}
      alt={alt}
      style={{
        ...style,
        transform: hover ? 'scale(1.05)' : 'scale(1)',
        transition: 'transform 0.3s ease',
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    />
  );
};

// Buttons with zoom hover effect
const HoverButton = ({ style, onClick, children }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      style={{
        ...style,
        transform: hovered ? 'scale(1.05)' : 'scale(1)',
        transition: 'transform 0.3s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const BestSellers = () => {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <main style={containerStyle}>
      <h1 style={titleStyle}>Best Sellers</h1>
      <div style={gridStyle}>
        {products.map(({ id, name, description, price, image }) => {
          const isExpanded = expandedId === id;
          return (
            <div key={id} style={cardStyle}>
              <HoverImage src={image} alt={name} style={imageStyle} />
              <h2 style={productNameStyle}>{name}</h2>
              <p style={isExpanded ? expandedDescStyle : descStyle}>
                {isExpanded ? description : description.slice(0, 60) + '...'}
              </p>
              <p style={priceStyle}>{price}</p>
              <div style={buttonRowStyle}>
                <HoverButton
                  style={cartButtonStyle}
                  onClick={() => alert(`Added ${name} to cart`)}
                >
                  Add to Cart
                </HoverButton>
                <HoverButton
                  style={buyButtonStyle}
                  onClick={() => alert(`Buying ${name}`)}
                >
                  Buy Now
                </HoverButton>
              </div>
              <HoverButton
                style={toggleButtonStyle}
                onClick={() => toggleExpand(id)}
              >
                {isExpanded ? 'Show Less' : 'Read More'}
              </HoverButton>
            </div>
          );
        })}
      </div>
    </main>
  );
};

const containerStyle = {
  maxWidth: 1200,
  margin: '40px auto',
  padding: '0 20px',
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  color: '#222',
};

const titleStyle = {
  fontSize: 32,
  fontWeight: '700',
  textAlign: 'center',
  marginBottom: 30,
  color: '#c19a6b',
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))',
  gap: 24,
};

const cardStyle = {
  backgroundColor: '#fff',
  borderRadius: 8,
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  padding: 16,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  minHeight: 400,
};

const imageStyle = {
  width: '100%',
  height: 180,
  objectFit: 'cover',
  borderRadius: 6,
  marginBottom: 12,
};

const productNameStyle = {
  fontSize: 20,
  fontWeight: '600',
  marginBottom: 8,
  color: '#222',
};

const descStyle = {
  fontSize: 14,
  color: '#555',
  marginBottom: 12,
  minHeight: 50,
};

const expandedDescStyle = {
  fontSize: 14,
  color: '#555',
  marginBottom: 12,
};

const priceStyle = {
  fontSize: 16,
  fontWeight: '700',
  color: '#000000',
  marginBottom: 12,
};

const buttonRowStyle = {
  display: 'flex',
  gap: 12,
  marginBottom: 16,
};

const baseButtonStyle = {
  padding: '10px 16px',
  borderRadius: 5,
  cursor: 'pointer',
  fontWeight: '600',
  fontSize: 14,
  border: 'none',
};

const cartButtonStyle = {
  ...baseButtonStyle,
  backgroundColor: '#ff9f00',
  color: '#fff',
};

const buyButtonStyle = {
  ...baseButtonStyle,
  backgroundColor: '#fb641b',
  color: '#fff',
};

const toggleButtonStyle = {
  ...baseButtonStyle,
  backgroundColor: '#000000',
  color: '#fff',
  alignSelf: 'flex-start',
};

export default BestSellers;

