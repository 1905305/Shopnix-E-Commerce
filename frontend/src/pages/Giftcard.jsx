import React, { useState, useEffect } from 'react';

const GiftCard = () => {
  const [name, setName] = useState('FULL NAME');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• ••••');
  const [expiry, setExpiry] = useState('MM/YY');
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    setCardNumber(generateCardNumber());
    setExpiry(generateExpiry());
  }, []);

  const generateCardNumber = () => {
    let num = '';
    for (let i = 0; i < 16; i++) {
      num += Math.floor(Math.random() * 10);
    }
    return num.replace(/(.{4})/g, '$1 ').trim();
  };

  const generateExpiry = () => {
    let month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
    return `${month}/28`;
  };

  const handleBlur = () => {
    if (name.trim() !== '' && name !== 'FULL NAME') {
      setFlipped(true);
    }
  };

  return (
    <div style={styles.page}>
      {/* Top Banner */}
      <img
        src="/assets/giftbanner.png"
        alt="Gift Banner"
        style={styles.banner}
      />

      {/* Gift Card */}
      <div style={styles.cardContainer}>
        <div style={styles.card}>
          <div
            style={{
              ...styles.cardInner,
              transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            }}
          >
            {/* Front */}
            <div style={{ ...styles.side, ...styles.front }}>
              <div style={styles.label}>Shopnix Exclusive Card</div>
              <div style={styles.number}>{cardNumber}</div>
              <div style={styles.name}>{name}</div>
              <div style={styles.expiry}>{expiry}</div>
            </div>

            {/* Back */}
            <div style={{ ...styles.side, ...styles.back }}>
              <div style={styles.reveal}>
                ₹999<br />GIFT CARD<br />EXCLUSIVE FOR YOU
              </div>
            </div>
          </div>
        </div>

        {/* Name Input */}
        <input
          style={styles.input}
          type="text"
          placeholder="Full Name"
          onChange={(e) => setName(e.target.value.toUpperCase() || 'FULL NAME')}
          onBlur={handleBlur}
        />
      </div>
    </div>
  );
};

const styles = {
  page: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: 'sans-serif',
    paddingBottom: '60px',
    background: '#f5f5f5',
    minHeight: '100vh',
  },
  banner: {
    width: '100%',
    maxHeight: '400px',
    objectFit: 'cover',
    paddingTop: '75px', // gap from navbar
    marginBottom: '40px',
    display: 'block',
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '25px', // ⬅ space between card and input
  },
  card: {
    width: '337.5px', // scaled: 100px per inch for 3.375"
    height: '212.5px', // scaled for 2.125"
    perspective: '1000px',
  },
  cardInner: {
    width: '100%',
    height: '100%',
    position: 'relative',
    transition: 'transform 0.6s ease',
    transformStyle: 'preserve-3d',
  },
  side: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backfaceVisibility: 'hidden',
    borderRadius: '15px',
    border: '2px solid gold',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'gold',
    padding: '20px',
    textAlign: 'center',
    fontWeight: 'bold',
    background: '#000',
  },
  front: {},
  back: {
    transform: 'rotateY(180deg)',
    fontSize: '1.3em',
  },
  label: {
    fontSize: '1.2em',
    marginBottom: '15px',
  },
  number: {
    letterSpacing: '2px',
    fontSize: '1.1em',
    marginBottom: '10px',
  },
  name: {
    fontSize: '1em',
    marginBottom: '5px',
  },
  expiry: {
    fontSize: '1em',
  },
  reveal: {
    textAlign: 'center',
  },
  input: {
    padding: '12px',
    fontSize: '1em',
    borderRadius: '5px',
    border: '1px solid gold',
    background: '#000',
    color: 'gold',
    textAlign: 'center',
    width: '220px',
    marginTop: '20px', // ⬅ extra space to avoid collision
  },
};

export default GiftCard;
