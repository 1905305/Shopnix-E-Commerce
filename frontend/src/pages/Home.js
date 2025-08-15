import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import CategoryCard from '../components/CategoryCard';
import BannerCarousel from '../components/BannerCarousel';
import MasonryGallery from '../components/MasonryGallery';
import BrandCard from '../components/BrandCard'; // ✅ NEW IMPORT
import '../styles/brandCard.css'; // ✅ CSS IMPORT
import SaleTimer from '../components/SaleTimer'; // ✅ correct


// ✅ Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [popupImage, setPopupImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
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
      name: 'Priya Sharma',
      role: 'Fashion Blogger',
      text: 'Shopnix changed how I shop — the quality, style, and service are top-notch!',
      image: '/Testimonialimages/priya.jpg'
    },
    {
      name: 'Rohit Verma',
      role: 'Fitness Trainer',
      text: 'The sports collection is perfect for my daily routine. Durable and stylish.',
      image: '/Testimonialimages/rohit.jpg'
    },
    {
      name: 'Anjali Mehta',
      role: 'Entrepreneur',
      text: 'From workwear to casual, Shopnix has it all. Highly recommend to my network!',
      image: '/Testimonialimages/anjali.jpg'
    },
    {
      name: 'Karan Malhotra',
      role: 'Stylist',
      text: 'Great curation, fast delivery and the returns are hassle-free. Love it!',
      image: '/Testimonialimages/karan.jpg'
    },
    {
      name: 'Neha Desai',
      role: 'Student',
      text: 'Affordable and trendy! My go-to place for fashion.',
      image: '/Testimonialimages/neha.jpg'
    },
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      const snap = await getDocs(collection(db, 'categories'));
      const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCategories(data);
    };

    const fetchBrands = async () => {
      const snap = await getDocs(collection(db, 'brands'));
      const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBrands(data);
    };

    fetchCategories();
    fetchBrands();

    const imageInterval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % imageCards.length);
    }, 5000);

    return () => {
      clearInterval(imageInterval);
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
      {/* ✅ Sale Timer Section */}
      <SaleTimer />

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

      {/* ✅ Black Friday Sale Video Inserted Below Categories and Above Brands */}
      <div
        style={{
          margin: '60px 0',
          borderRadius: '12px',
          overflow: 'hidden',
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            borderRadius: '12px',
            objectFit: 'cover',
          }}
        >
          <source src="/assets/blackfridaysale.mp4" type="video/mp4" />
        </video>
      </div>

      <h2 style={{ margin: '60px 0 20px', fontSize: '24px', color: '#111' }}>In Collaboration with Shopnix</h2>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '24px',
          justifyContent: 'center',
        }}
      >
        {brands.map((brand) => (
          <BrandCard
            key={brand.id}
            name={brand.name}
            image={brand.image}
            category={brand.category}
          />
        ))}
      </div>

      <div
        style={{
          margin: '60px 0',
          borderRadius: '12px',
          overflow: 'hidden',
        }}
      >
        <img
          src="/assets/shopnixlength.png"
          alt="Shopnix Length Banner"
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            borderRadius: '12px',
            objectFit: 'cover',
          }}
        />
      </div>

      <MasonryGallery />

      {/* ✅ Inserted Swiper carousel between "Shopnix Inspiration" and testimonials */}
      <div
        style={{
          margin: '60px 0',
          borderRadius: '12px',
          overflow: 'hidden',
        }}
      >
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          modules={[Autoplay, Pagination]}
          style={{ width: '100%', height: 'auto' }}
        >
          <SwiperSlide>
            <img
              src="/assets/banner1.png"
              alt="Banner 1"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                borderRadius: '12px',
                objectFit: 'cover',
              }}
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="/assets/bananner2.png"
              alt="Banner 2"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                borderRadius: '12px',
                objectFit: 'cover',
              }}
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="/assets/banner3.png"
              alt="Banner 3"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                borderRadius: '12px',
                objectFit: 'cover',
              }}
            />
          </SwiperSlide>
        </Swiper>
      </div>

      {/* ✅ Swiper Testimonial Section */}
      <div
        style={{
          marginTop: '60px',
          padding: '40px',
          borderRadius: '16px',
          backgroundColor: '#fafafa',
          border: '1px solid #ddd',
        }}
      >
        <h2
          style={{
            fontSize: '26px',
            color: '#222',
            marginBottom: '24px',
            textAlign: 'center',
          }}
        >
          What Our Customers Say
        </h2>

        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          modules={[Autoplay, Pagination]}
          style={{ maxWidth: '600px', margin: '0 auto' }}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div style={{ textAlign: 'center' }}>
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    marginBottom: '16px',
                  }}
                />
                <p style={{ fontSize: '16px', fontStyle: 'italic', color: '#555' }}>
                  "{testimonial.text}"
                </p>
                <p style={{ fontWeight: 'bold', marginTop: '12px', color: '#000' }}>
                  {testimonial.name}
                </p>
                <p style={{ color: '#777', fontSize: '14px' }}>
                  {testimonial.role}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'stretch',
          gap: '40px',
          justifyContent: 'center',
          marginTop: '40px',
        }}
      >
        <div style={{ flex: '0 0 70%', maxWidth: '70%' }}>
          <img
            src="/assets/Shopnixcateg.png"
            alt="Shopnix Categories"
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '12px',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </div>
        <div style={{ flex: '0 0 30%', maxWidth: '30%' }}>
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '12px',
              objectFit: 'cover',
              display: 'block',
            }}
          >
            <source src="/assets/Sale_2.mp4" type="video/mp4" />
          </video>
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