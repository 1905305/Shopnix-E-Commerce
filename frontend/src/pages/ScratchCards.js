import React, { useEffect } from 'react';

const ScratchCards = () => {
  useEffect(() => {
    const coats = document.querySelectorAll('.coat');

    coats.forEach(coat => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      coat.appendChild(canvas);

      const resizeCanvas = () => {
        canvas.width = coat.offsetWidth;
        canvas.height = coat.offsetHeight;
        ctx.fillStyle = '#b3bbc4';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      };
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);

      let isDrawing = false;
      const scratch = (e) => {
        if (!isDrawing) return;
        const rect = canvas.getBoundingClientRect();
        const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
        const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, Math.PI * 2);
        ctx.fill();
      };

      const start = () => isDrawing = true;
      const stop = () => isDrawing = false;

      canvas.addEventListener('mousedown', start);
      canvas.addEventListener('touchstart', start);
      canvas.addEventListener('mouseup', stop);
      canvas.addEventListener('touchend', stop);
      canvas.addEventListener('mousemove', scratch);
      canvas.addEventListener('touchmove', scratch);
    });
  }, []);

  return (
    <main style={wrap}>
      {/* 🔹 Banner Image */}
      <img
        src="/assets/scratchbanner.png"
        alt="Scratch & Win Banner"
        style={bannerStyle}
      />

      <h1 style={title}>Scratch & Win</h1>
      <div style={grid}>
        {prizes.map((prize, idx) => (
          <div style={scratchCard} key={idx}>
            <div style={prizeStyle}>
              <div style={prizeTitle}>{prize.title}</div>
              <div style={prizeSub}>{prize.sub}</div>
            </div>
            <div className="coat" style={coatStyle}></div>
          </div>
        ))}
      </div>
    </main>
  );
};

const prizes = [
  { title: '₹500 Cashback', sub: 'On your next order' },
  { title: 'Free Shipping', sub: 'Valid for 7 days' },
  { title: '₹200 Off', sub: 'Min spend ₹999' },
  { title: 'Buy 1 Get 1', sub: 'On select items' },
  { title: '₹1000 Voucher', sub: 'For electronics' },
  { title: 'Extra 10% Off', sub: 'All categories' },
  { title: '₹50 Wallet Credit', sub: 'Instantly added' },
  { title: 'Mystery Gift', sub: 'Limited stock' },
];

const wrap = {
  maxWidth: 1100,
  margin: '48px auto 80px',
  padding: '50px 16px 0',
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
};

const bannerStyle = {
  width: '100%',
  height: 'auto',
  marginBottom: '24px',
  borderRadius: '12px',
};

const title = {
  margin: '0 0 20px',
  fontWeight: 800,
  letterSpacing: '0.2px',
  fontSize: 'clamp(24px, 2.6vw, 34px)',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  color: '#6fd4ff',
};

const grid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  gap: '20px',
};

const scratchCard = {
  position: 'relative',
  aspectRatio: '5 / 3',
  borderRadius: '20px',
  overflow: 'hidden',
  background: 'rgba(21, 25, 34, 0.85)',
  backdropFilter: 'blur(12px)',
  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.45)',
  userSelect: 'none',
};

const prizeStyle = {
  position: 'absolute',
  inset: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '6px',
  padding: '16px',
  textAlign: 'center',
};

const prizeTitle = {
  fontWeight: 900,
  fontSize: 'clamp(20px, 2.4vw, 30px)',
  letterSpacing: '0.3px',
  background: 'linear-gradient(90deg, #6fd4ff, #ffffff)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
};

const prizeSub = {
  fontSize: 'clamp(12px, 1.2vw, 14px)',
  color: '#a8b4c4',
};

const coatStyle = {
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  display: 'block',
  cursor: 'grab',
  touchAction: 'none',
  borderRadius: '20px',
};

export default ScratchCards;
