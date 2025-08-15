import React, { useState } from 'react';

const products = [
  {
    id: 1,
    name: 'Wireless Noise Cancelling Headphones',
    description: 'Top-notch wireless headphones with active noise cancellation for immersive sound experience.',
    price: '₹7,999',
    image: 'https://m.media-amazon.com/images/I/31SLkF15ZkL._SX300_SY300_QL70_FMwebp_.jpg',
  },
  {
    id: 2,
    name: 'Smart Fitness Tracker',
    description: 'Track your health and activity with this sleek and accurate fitness tracker.',
    price: '₹2,499',
    image: 'https://m.media-amazon.com/images/I/414WIlQMvaL._SX300_SY300_QL70_FMwebp_.jpg',
  },
  {
    id: 3,
    name: '4K Ultra HD Smart TV',
    description: 'Enjoy your favorite shows with crystal clear 4K Ultra HD on this smart TV.',
    price: '₹29,999',
    image: 'https://m.media-amazon.com/images/I/51hbNavfr5L._SY300_SX300_QL70_FMwebp_.jpg',
  },
  {
    id: 4,
    name: 'Portable Bluetooth Speaker',
    description: 'Compact speaker with powerful sound and long battery life for music on the go.',
    price: '₹1,299',
    image: 'https://m.media-amazon.com/images/I/41wigi67dJL._SX300_SY300_QL70_FMwebp_.jpg',
  },
  {
    id: 5,
    name: 'Wireless Charging Pad',
    description: 'Fast wireless charger compatible with all Qi-enabled devices.',
    price: '₹999',
    image: 'https://m.media-amazon.com/images/I/71wgqBuZ+0L._SX679_.jpg',
  },
  {
    id: 6,
    name: 'Gaming Mechanical Keyboard',
    description: 'Responsive and durable keyboard with RGB lighting for gaming pros.',
    price: '₹4,499',
    image: 'https://m.media-amazon.com/images/I/41ikAltNvAL._SX300_SY300_QL70_FMwebp_.jpg',
  },
  {
    id: 7,
    name: 'Noise-Isolating Earbuds',
    description: 'Comfortable earbuds with superior noise isolation and crystal clear sound.',
    price: '₹1,899',
    image: 'https://m.media-amazon.com/images/I/31GDuIz19qL._SX300_SY300_QL70_FMwebp_.jpg',
  },
  {
    id: 8,
    name: 'Smart Home Assistant',
    description: 'Control your smart devices and get info with this voice-controlled assistant.',
    price: '₹3,999',
    image: 'https://m.media-amazon.com/images/I/61dgl2srHDL.jpg',
  },
  {
    id: 9,
    name: 'Action Camera 4K',
    description: 'Capture your adventures in stunning 4K resolution with image stabilization.',
    price: '₹8,999',
    image: 'https://m.media-amazon.com/images/I/41rMix-fqJL._SX300_SY300_QL70_FMwebp_.jpg',
  },
  {
    id: 10,
    name: 'Smartphone Gimbal Stabilizer',
    description: 'Smooth video capture with this 3-axis smartphone stabilizer.',
    price: '₹5,499',
    image: 'https://m.media-amazon.com/images/I/31en8323kYL._SX300_SY300_QL70_FMwebp_.jpg',
  },
  {
    id: 11,
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with adjustable DPI and long battery life.',
    price: '₹799',
    image: 'https://m.media-amazon.com/images/I/31qJ7qfj-9L._SX300_SY300_QL70_FMwebp_.jpg',
  },
  {
    id: 12,
    name: 'LED Desk Lamp',
    description: 'Adjustable brightness desk lamp with USB charging port.',
    price: '₹1,299',
    image: 'https://m.media-amazon.com/images/I/31TcSUXnt7L._SX300_SY300_QL70_FMwebp_.jpg',
  },
  {
    id: 13,
    name: 'Smartwatch with Heart Rate Monitor',
    description: 'Track your fitness and health metrics with this stylish smartwatch.',
    price: '₹6,499',
    image: 'https://m.media-amazon.com/images/I/41y-pszzgfL._SX300_SY300_QL70_FMwebp_.jpg',
  },
  {
    id: 14,
    name: 'Laptop Backpack',
    description: 'Durable and spacious backpack with dedicated laptop compartment.',
    price: '₹2,299',
    image: 'https://m.media-amazon.com/images/I/51I-8bw5G8L._SX679_.jpg',
  },
  {
    id: 15,
    name: 'Portable Power Bank 20000mAh',
    description: 'High capacity power bank with fast charging capabilities.',
    price: '₹1,799',
    image: 'https://m.media-amazon.com/images/I/71pdNEtPuZL._SX679_.jpg',
  },
  {
    id: 16,
    name: 'Wireless Gaming Headset',
    description: 'Immersive sound and mic with low latency for serious gamers.',
    price: '₹3,499',
    image: 'https://m.media-amazon.com/images/I/41NSu3j+w8L._SY300_SX300_.jpg',
  },
];

const NewArrivals = () => {
  const [expandedId, setExpandedId] = useState(null);
  const [quantities, setQuantities] = useState(
    products.reduce((acc, p) => {
      acc[p.id] = 0; // initial quantity 0
      return acc;
    }, {})
  );

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const incrementQty = (id) => {
    setQuantities(prev => ({ ...prev, [id]: prev[id] + 1 }));
  };

  const decrementQty = (id) => {
    setQuantities(prev => ({ ...prev, [id]: prev[id] > 0 ? prev[id] - 1 : 0 }));
  };

  const handleBuyNow = (id) => {
    alert(`Buy Now clicked for product ID: ${id}, Quantity: ${quantities[id]}`);
  };

  const handleAddToCart = (id) => {
    alert(`Added to cart product ID: ${id}, Quantity: ${quantities[id]}`);
  };

  return (
    <main style={containerStyle}>
      <h1 style={titleStyle}>New Arrivals</h1>
      <div style={gridStyle}>
        {products.map(({ id, name, description, price, image }) => {
          const isExpanded = expandedId === id;
          return (
            <div key={id} style={cardStyle}>
              <img src={image} alt={name} style={imageStyle} />
              <h2 style={productNameStyle}>{name}</h2>
              <p style={isExpanded ? expandedDescStyle : descStyle}>
                {isExpanded ? description : description.slice(0, 60) + '...'}
              </p>
              <p style={priceStyle}>{price}</p>

              <div style={actionsContainerStyle}>
                <div style={quantityContainerStyle}>
                  <button style={qtyBtnStyle} onClick={() => decrementQty(id)}>-</button>
                  <span style={qtyDisplayStyle}>{quantities[id]}</span>
                  <button style={qtyBtnStyle} onClick={() => incrementQty(id)}>+</button>
                </div>
                <div style={buttonsWrapperStyle}>
                  <button style={buyNowBtnStyle} onClick={() => handleBuyNow(id)}>Buy Now</button>
                  <button style={addToCartBtnStyle} onClick={() => handleAddToCart(id)}>Add to Cart</button>
                </div>
              </div>

              <button style={buttonStyle} onClick={() => toggleExpand(id)}>
                {isExpanded ? 'Show Less' : 'Read More'}
              </button>
            </div>
          );
        })}
      </div>
    </main>
  );
};

const containerStyle = {
  maxWidth: 1200,
  margin: '40px auto',
  padding: '0 20px',
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  color: '#222',
};

const titleStyle = {
  fontSize: 32,
  fontWeight: '700',
  textAlign: 'center',
  marginBottom: 30,
  color: '#c19a6b',
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))',
  gap: 24,
};

const cardStyle = {
  backgroundColor: '#fff',
  borderRadius: 8,
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  padding: 16,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  minHeight: 420,
};

const imageStyle = {
  width: '100%',
  height: 180,
  objectFit: 'cover',
  borderRadius: 6,
  marginBottom: 12,
};

const productNameStyle = {
  fontSize: 20,
  fontWeight: '600',
  marginBottom: 8,
  color: '#222',
};

const descStyle = {
  fontSize: 14,
  color: '#555',
  marginBottom: 12,
  minHeight: 50,
};

const expandedDescStyle = {
  fontSize: 14,
  color: '#555',
  marginBottom: 12,
};

const priceStyle = {
  fontSize: 16,
  fontWeight: '700',
  color: '#000000',
  marginBottom: 16,
};

const actionsContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 12,
  flexWrap: 'wrap',
  gap: 10,
};

const quantityContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
};

const qtyBtnStyle = {
  backgroundColor: '#ddd',
  border: 'none',
  borderRadius: 4,
  padding: '4px 10px',
  fontWeight: '700',
  cursor: 'pointer',
  userSelect: 'none',
};

const qtyDisplayStyle = {
  minWidth: 24,
  textAlign: 'center',
  fontWeight: '600',
  fontSize: 16,
};

const buttonsWrapperStyle = {
  display: 'flex',
  gap: 10,
};

const buyNowBtnStyle = {
  backgroundColor: '#fb641b', // changed color
  border: 'none',
  color: '#fff',
  padding: '8px 14px',
  borderRadius: 5,
  cursor: 'pointer',
  fontWeight: '600',
  fontSize: 14,
  transition: 'background-color 0.3s',
};

const addToCartBtnStyle = {
  backgroundColor: '#ff9f00', // changed color
  border: 'none',
  color: '#fff',
  padding: '8px 14px',
  borderRadius: 5,
  cursor: 'pointer',
  fontWeight: '600',
  fontSize: 14,
  transition: 'background-color 0.3s',
};

const buttonStyle = {
  backgroundColor: '#000000',
  border: 'none',
  color: '#fff',
  padding: '10px 16px',
  borderRadius: 5,
  cursor: 'pointer',
  fontWeight: '600',
  fontSize: 14,
  transition: 'background-color 0.3s',
};

export default NewArrivals;
