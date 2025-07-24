import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import CategoryCard from '../components/CategoryCard';
import BannerCarousel from '../components/BannerCarousel';
import MasonryGallery from '../components/MasonryGallery'; // Imported here

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [popupImage, setPopupImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const navigate = useNavigate();

  const imageCards = [
    {
      src: '/images/look1.jpg',
      caption: 'Street Elegance',
      desc: 'Bold meets effortless. Turn sidewalks into runways with structured silhouettes and rich tones.',
    },
    {
      src: '/images/look2.jpg',
      caption: 'Layered Chic',
      desc: 'Master the art of layering — where minimal meets dimension for cooler weather vibes.',
    },
    {
      src: '/images/look3.jpg',
      caption: 'Signature Flow',
      desc: 'Soft lines, sleek movement. This is where high fashion meets everyday power dressing.',
    },
  ];

  const testimonials = [
    {
      name: 'Arjun Kapoor',
      role: 'Fashion Enthusiast',
      text: 'Shopnix changed how I shop — the quality, style, and service are top-notch!',
    },
    {
      name: 'Sneha Rao',
      role: 'Fitness Coach',
      text: 'The sports collection is perfect for my daily routine. Durable and stylish.',
    },
    {
      name: 'Devansh Patel',
      role: 'Entrepreneur',
      text: 'From workwear to casual, Shopnix has it all. Highly recommend to my network!',
    },
    {
      name: 'Meera Shah',
      role: 'Stylist',
      text: 'Great curation, fast delivery and the returns are hassle-free. Love it!',
    },
    {
      name: 'Ritika Verma',
      role: 'Student',
      text: 'Affordable and trendy! My go-to place for fashion.',
    },
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      const snap = await getDocs(collection(db, 'categories'));
      const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCategories(data);
    };

    fetchCategories();

    const imageInterval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % imageCards.length);
    }, 5000);

    const testimonialInterval = setInterval(() => {
      setTestimonialIndex(prev => (prev + 1) % testimonials.length);
    }, 8000);

    return () => {
      clearInterval(imageInterval);
      clearInterval(testimonialInterval);
    };
  }, []);

  return (
    <div
      style={{
        padding: '100px 24px 24px',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div style={{ marginBottom: '40px' }}>
        <BannerCarousel />
      </div>

      <h2 style={{ marginBottom: '20px', fontSize: '24px', color: '#111' }}>Shop by Category</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
          gap: '98px',
        }}
      >
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => navigate(`/products/${cat.name}`)}
            style={{
              cursor: 'pointer',
              padding: '12px',
              borderRadius: '8px',
              backgroundColor: '#fff',
              boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
              transition: 'transform 0.2s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <CategoryCard name={cat.name} image={cat.image} />
          </div>
        ))}
      </div>

      {/* INSERTED Masonry Gallery Here */}
      <MasonryGallery />

      <div
        style={{
          display: 'flex',
          marginTop: '80px',
          padding: '40px',
          background: 'rgba(193, 154, 107, 0.1)',
          borderRadius: '16px',
          gap: '40px',
          fontFamily: 'Arial, sans-serif',
          alignItems: 'flex-start',
        }}
      >
        <div style={{ flex: '0 0 60%', maxWidth: '60%' }}>
          <div style={{ position: 'relative', paddingTop: '78%', borderRadius: '12px', overflow: 'hidden' }}>
            <iframe
              src="https://www.youtube.com/embed/eHQ1stu0cu0"
              title="Shopnix Fashion Promo"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 'none',
                borderRadius: '12px',
              }}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        <div style={{ flex: '0 0 40%', maxWidth: '40%' }}>
          <div
            onClick={() => setPopupImage(imageCards[currentIndex].src)}
            style={{
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              borderRadius: '12px',
              backgroundColor: '#fff',
              overflow: 'hidden',
              cursor: 'pointer',
            }}
          >
            <img
              src={imageCards[currentIndex].src}
              alt={imageCards[currentIndex].caption}
              style={{
                width: '100%',
                height: '360px',
                objectFit: 'cover',
              }}
            />
            <div style={{ padding: '16px', textAlign: 'center' }}>
              <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>{imageCards[currentIndex].caption}</h3>
              <p style={{ fontSize: '14px' }}>{imageCards[currentIndex].desc}</p>
            </div>
            <button
              style={{
                backgroundColor: '#1a1a1a',
                color: '#fff',
                width: '100%',
                padding: '12px',
                fontSize: '16px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              View Style
            </button>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '60px', padding: '40px', borderRadius: '16px', backgroundColor: '#fafafa', border: '1px solid #ddd' }}>
        <h2 style={{ fontSize: '26px', color: '#222', marginBottom: '24px', textAlign: 'center' }}>What Our Customers Say</h2>
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: '16px', fontStyle: 'italic', color: '#555' }}>
            "{testimonials[testimonialIndex].text}"
          </p>
          <p style={{ fontWeight: 'bold', marginTop: '12px', color: '#000' }}>{testimonials[testimonialIndex].name}</p>
          <p style={{ color: '#777', fontSize: '14px' }}>{testimonials[testimonialIndex].role}</p>
        </div>
      </div>

      {popupImage && (
        <div
          onClick={() => setPopupImage(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.85)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
          }}
        >
          <div style={{ position: 'relative' }}>
            <img
              src={popupImage}
              alt="Popup"
              style={{
                maxWidth: '90vw',
                maxHeight: '90vh',
                borderRadius: '12px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
              }}
            />
            <button
              onClick={() => setPopupImage(null)}
              style={{
                position: 'absolute',
                top: '-20px',
                right: '-20px',
                background: '#fff',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                fontSize: '20px',
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
