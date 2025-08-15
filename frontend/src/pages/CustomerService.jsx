import React, { useEffect } from 'react';

const CustomerService = () => {
  const services = [
    { title: 'Order Assistance', description: 'Track your orders, check status, and get updates quickly.', icon: '📦' },
    { title: 'Returns & Exchanges', description: 'Hassle-free returns and exchanges with quick processing.', icon: '🔄' },
    { title: 'Product Guidance', description: 'Get expert help for product selection and recommendations.', icon: '🛍️' },
    { title: 'Payment Support', description: 'Assistance with checkout, payments, and invoices.', icon: '💳' },
  ];

  useEffect(() => {
    const cards = document.querySelectorAll('.fade-card');

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.1 }
    );

    cards.forEach(card => {
      observer.observe(card);

      // Hover effects
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px)';
        card.style.boxShadow = '0 12px 30px rgba(0,0,0,0.18)';
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 8px 25px rgba(0,0,0,0.12)';
      });
    });
  }, []);

  return (
    <main>
      {/* Full-width banner */}
      <section style={bannerSection}>
        <img 
          src="/assets/customersupport.png" 
          alt="Customer Support" 
          style={bannerImageStyle} 
        />
      </section>

      {/* Main content */}
      <div style={containerStyle}>
        <h1 style={headingStyle}>Customer Service</h1>
        <p style={introText}>
          Welcome to Shopnix Customer Service! We are committed to making your shopping experience smooth, hassle-free, and enjoyable. Reach out anytime—we are available 24/7.
        </p>

        {/* Service cards */}
        <section style={cardsContainer}>
          {services.map((service, idx) => (
            <div key={idx} className="fade-card" style={cardStyle}>
              <div style={iconStyle}>{service.icon}</div>
              <h3 style={cardTitle}>{service.title}</h3>
              <p style={cardDesc}>{service.description}</p>
            </div>
          ))}
        </section>

        {/* Contact Section */}
        <section style={contactSection}>
          <h2 style={sectionHeading}>Contact Us Anytime</h2>
          <p style={contactText}>
            Call Assistance: <a href="tel:+1234567890" style={contactLink}>+1 234 567 890</a>
          </p>
          <p style={contactText}>
            Email: <a href="mailto:support@shopnix.com" style={contactLink}>support@shopnix.com</a>
          </p>
        </section>
      </div>
    </main>
  );
};

// Full-width banner styles
const bannerSection = {
  width: '100%',
  backgroundColor: '#f5f7fa',
  padding: '40px 0',
  display: 'flex',
  justifyContent: 'center',
};

const bannerImageStyle = {
  width: '90%',
  maxWidth: '1400px',
  borderRadius: 16,
  boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
  objectFit: 'cover',
  paddingTop: '60px', // ✅ added
  
};

// White content box styles
const containerStyle = {
  maxWidth: 1100,
  margin: '50px auto',
  padding: '30px 24px',
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  color: '#222',
  lineHeight: 1.6,
  backgroundColor: '#fdfdfd',
  borderRadius: 12,
  boxShadow: '0 10px 30px rgba(0,0,0,0.12)',

};

const headingStyle = {
  fontSize: 36,
  fontWeight: '700',
  textAlign: 'center',
  marginBottom: 20,
  color: '#0b3d91',
};

const introText = {
  fontSize: 18,
  textAlign: 'center',
  marginBottom: 50,
  color: '#555',
};

const cardsContainer = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
  gap: '30px',
  marginBottom: 60,
};

const cardStyle = {
  backgroundColor: '#f5f5f5',
  padding: '35px 25px',
  borderRadius: 18,
  boxShadow: '0 8px 25px rgba(0,0,0,0.12)',
  opacity: 0,
  transform: 'translateY(30px)',
  transition: 'all 0.3s ease',
  textAlign: 'center',
  cursor: 'pointer',
  userSelect: 'none',
};

const iconStyle = {
  fontSize: 50,
  marginBottom: 20,
};

const cardTitle = {
  fontSize: 22,
  fontWeight: 600,
  marginBottom: 12,
  color: '#0b3d91',
};

const cardDesc = {
  fontSize: 16,
  color: '#555',
  lineHeight: 1.6,
};

const contactSection = {
  textAlign: 'center',
  marginTop: 40,
};

const sectionHeading = {
  fontSize: 24,
  fontWeight: 600,
  marginBottom: 18,
  color: '#0b3d91',
};

const contactText = {
  fontSize: 17,
  marginBottom: 12,
};

const contactLink = {
  color: '#0b3d91',
  fontWeight: 'bold',
  textDecoration: 'none',
};

export default CustomerService;
