import React from 'react';

const imageGroups = [
  [
    'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg',
    'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg',
    'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg',
  ],
  [
    'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg',
    'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg',
    'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg',
  ],
  [
    'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg',
    'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg',
    'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg',
  ],
  [
    'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-9.jpg',
    'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-10.jpg',
    'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-11.jpg',
  ],
];

const MasonryGallery = () => {
  return (
    <div style={{ marginTop: '80px', marginBottom: '80px' }}>
      <h2 style={{ fontSize: '24px', marginBottom: '32px', textAlign: 'center', color: '#111' }}>
      Curated Picks by Shopnix — Tailored to Inspire
      </h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '24px',
        }}
      >
        {imageGroups.map((group, index) => (
          <div key={index} style={{ display: 'grid', gap: '16px' }}>
            {group.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Fashion inspiration ${index}-${i}`}
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '12px',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MasonryGallery;
