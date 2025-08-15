import React, { useState } from 'react';

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'How do I place an order?',
      answer: 'Browse products, add to cart, and checkout securely with multiple payment options.',
    },
    {
      question: 'Can I cancel or change my order?',
      answer: 'Orders can be modified within 1 hour of placement. Contact support ASAP for changes.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept credit/debit cards, UPI, net banking, and popular wallets.',
    },
    {
      question: 'How long does delivery take?',
      answer: 'Delivery usually takes 3–5 business days depending on your location.',
    },
    {
      question: 'Do you offer international shipping?',
      answer: 'Currently, we only ship within India. International shipping is coming soon.',
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main style={container}>
      {/* Banner Image */}
      <div style={bannerWrapper}>
        <img
          src="/assets/faqbanner.png"
          alt="FAQs Banner"
          style={bannerImage}
        />
      </div>

      <h1 style={title}>FAQs</h1>

      {faqs.map((faq, index) => (
        <section key={index} style={section}>
          <div style={questionRow} onClick={() => toggleFAQ(index)}>
            <h2
              style={{
                ...question,
                color: openIndex === index ? '#c19a6b' : '#333',
              }}
            >
              {faq.question}
            </h2>
            <span
              style={{
                ...icon,
                transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            >
              ▼
            </span>
          </div>
          {openIndex === index && <p style={answer}>{faq.answer}</p>}
        </section>
      ))}
    </main>
  );
};

// Styles
const container = {
  maxWidth: 700,
  margin: '40px auto',
  padding: '0 20px',
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  color: '#222',
};

const bannerWrapper = {
  width: '100%',
  maxWidth: 960,
  margin: '50px auto 30px', // ✅ padding top 50px
  borderRadius: 8,
  overflow: 'hidden',
  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
};

const bannerImage = {
  width: '100%',
  height: 'auto',
  display: 'block',
  paddingTop: '50px', // ✅ added
};

const title = {
  fontSize: 32,
  fontWeight: '700',
  marginBottom: 24,
  borderBottom: '3px solid #c19a6b',
  paddingBottom: 8,
};

const section = {
  marginBottom: 16,
  padding: '12px 0',
  borderBottom: '1px solid #ddd',
};

const questionRow = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  cursor: 'pointer',
};

const question = {
  fontSize: 20,
  fontWeight: '600',
  marginBottom: 0,
  transition: 'color 0.3s ease',
};

const icon = {
  fontSize: 18,
  color: '#666',
  transition: 'transform 0.3s ease',
};

const answer = {
  fontSize: 16,
  lineHeight: 1.5,
  color: '#444',
  marginTop: 8,
};

export default FAQs;
