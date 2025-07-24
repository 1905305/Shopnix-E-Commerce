// src/components/BannerCarousel.jsx

import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const bannerImages = [
  { src: '/assets/banners/1.png', text: 'Deals that make you smile!' },
  { src: '/assets/banners/2.png', text: 'Style. Delivered.' },
  { src: '/assets/banners/3.png', text: 'Shop Smart. Shopnix!' },
  { src: '/assets/banners/4.png', text: 'New drops. Big vibes.' },
  { src: '/assets/banners/5.png', text: 'Swipe. Buy. Repeat.' },
  { src: '/assets/banners/6.png', text: 'Because you deserve it.' },
];

const BannerCarousel = () => {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: '100vw',
        overflow: 'hidden',
        marginBottom: '40px',
        background: 'linear-gradient(135deg, #f0f8ff, #ffe4f1)',
        padding: '10px 0',
        borderRadius: '12px',
      }}
    >
      <Carousel
        autoPlay
        infinite
        showDots
        arrows={false}
        autoPlaySpeed={3000}
        responsive={{
          desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
          tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
          mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
        }}
      >
        {bannerImages.map(({ src, text }, idx) => (
          <div
            key={idx}
            style={{
              position: 'relative',
              width: '100%',
              textAlign: 'center',
            }}
          >
            <img
              src={src}
              alt={`Banner ${idx + 1}`}
              loading="eager"
              style={{
                width: '100%',
                height: '500px', // Adjust as needed
                objectFit: 'cover',
                display: 'block',
                borderRadius: '10px',
                transition: 'transform 0.6s ease',
                imageRendering: 'auto', // or 'crisp-edges' for ultra-sharp images
              }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.03)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '10%',
                left: '50%',
                transform: 'translateX(-50%)',
                color: '#fff',
                fontSize: '1.5rem',
                fontWeight: 700,
                textShadow: '1px 1px 8px rgba(0,0,0,0.6)',
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                padding: '6px 16px',
                borderRadius: '8px',
              }}
            >
              {text}
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default BannerCarousel;
