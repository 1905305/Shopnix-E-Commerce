import React, { useEffect, useState } from 'react';

const images = [
  '/images/look1.jpg',
  '/images/look2.jpg',
  '/images/look3.jpg',
  '/images/look4.jpg',
  '/images/look5.jpg',
];

const PromoCarousel = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000); // 5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      style={{
        marginTop: '20px',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
        height: '240px',
        backgroundColor: '#fff',
      }}
    >
      <img
        src={images[index]}
        alt={`Promo ${index + 1}`}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: 'opacity 0.6s ease-in-out',
        }}
      />
    </div>
  );
};

export default PromoCarousel;
