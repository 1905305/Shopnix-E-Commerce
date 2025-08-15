import React from 'react';
import '../styles/brandCard.css';

const BrandCard = ({ name, image, category }) => {
  return (
    <div className="brand-card">
      <img src={image} alt={name} className="brand-image" />
      <div className="brand-details">
        <h3>{name}</h3>
        <p>{category}</p>
      </div>
    </div>
  );
};

export default BrandCard;
