import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { db, auth } from '../firebase';
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';

// ✅ Toast Component
const Toast = ({ message, visible }) => (
  <div
    style={{
      position: 'fixed',
      top: visible ? '20px' : '-100px',
      right: '20px',
      background: '#323232',
      color: '#fff',
      padding: '14px 22px',
      borderRadius: '8px',
      boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
      fontSize: '15px',
      opacity: visible ? 1 : 0,
      transition: 'all 0.5s ease',
      zIndex: 9999,
    }}
  >
    {message}
  </div>
);

// ✅ PriceFilter Component
const PriceFilter = ({ min, max, selectedMin, selectedMax, onChange }) => {
  const priceGap = 1000;
  const progressRef = useRef(null);

  const updateProgress = (minVal, maxVal) => {
    if (progressRef.current) {
      progressRef.current.style.left = `${(minVal / max) * 100}%`;
      progressRef.current.style.right = `${100 - (maxVal / max) * 100}%`;
    }
  };

  const handleInputChange = (type, value) => {
    const parsedValue = parseInt(value) || 0;
    const newMin = type === 'min' ? parsedValue : selectedMin;
    const newMax = type === 'max' ? parsedValue : selectedMax;

    if (newMax - newMin >= priceGap && newMax <= max && newMin >= min) {
      onChange({ min: newMin, max: newMax });
      updateProgress(newMin, newMax);
    }
  };

  const handleSliderChange = (type, value) => {
    const parsedValue = parseInt(value);
    let newMin = selectedMin;
    let newMax = selectedMax;

    if (type === 'min') {
      newMin = Math.min(parsedValue, newMax - priceGap);
    } else {
      newMax = Math.max(parsedValue, newMin + priceGap);
    }

    onChange({ min: newMin, max: newMax });
    updateProgress(newMin, newMax);
  };

  useEffect(() => {
    updateProgress(selectedMin, selectedMax);
  }, [selectedMin, selectedMax]);

  return (
    <div style={{ marginTop: '10px' }}>
      <h4>Price Range</h4>
      <p style={{ fontSize: '13px', marginBottom: '10px' }}>
        Use slider or enter min and max price
      </p>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div>
          <label>Min</label>
          <input
            type="number"
            value={selectedMin}
            onChange={(e) => handleInputChange('min', e.target.value)}
            style={{ width: '80px', padding: '4px', marginRight: '5px' }}
          />
        </div>
        <span>-</span>
        <div>
          <label>Max</label>
          <input
            type="number"
            value={selectedMax}
            onChange={(e) => handleInputChange('max', e.target.value)}
            style={{ width: '80px', padding: '4px' }}
          />
        </div>
      </div>

      <div className="slider" style={{ position: 'relative', height: '5px', background: '#ddd', margin: '15px 0' }}>
        <div
          ref={progressRef}
          style={{
            position: 'absolute',
            height: '100%',
            background: '#2874f0',
            borderRadius: '5px',
            left: '0%',
            right: '0%',
          }}
        />
      </div>

      <div style={{ position: 'relative' }}>
        <input
          type="range"
          min={min}
          max={max}
          value={selectedMin}
          step="100"
          onChange={(e) => handleSliderChange('min', e.target.value)}
          style={{ width: '100%', position: 'absolute', pointerEvents: 'none' }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={selectedMax}
          step="100"
          onChange={(e) => handleSliderChange('max', e.target.value)}
          style={{ width: '100%' }}
        />
      </div>
    </div>
  );
};

// ✅ Main Products Component
const Products = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [quantities, setQuantities] = useState({});
  const [toast, setToast] = useState({ message: '', visible: false });

  const [selectedBrand, setSelectedBrand] = useState([]);
  const [selectedRating, setSelectedRating] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 49, max: 149999 });

  const brandMap = {
    Mobiles: ['Apple', 'Samsung', 'OnePlus', 'Xiaomi', 'iQOO', 'Motorola', 'Poco'],
    Sports: ['Nivia', 'Yonex', 'Cosco', 'Spalding', 'GM'],
    Laptops: ['HP', 'Dell', 'Lenovo', 'Asus', 'Apple', 'Acer'],
    Kitchen: ['Wonderchef', 'Tupperware', 'Borosil', 'Milton', 'Cello', 'Butterfly', 'Pigeon', 'Hawkins'],
    Grocery: ['Tata', 'Fortune', 'Aashirvaad', 'India Gate', 'Maggi', "Kellogg's", 'Bru'],
    Beauty: ['Plum', 'Maybelline', 'Biotique', 'The Derma Co', 'L\'Oréal', 'Lakmé'],
    Appliances: ['Dyson', 'Whirlpool', 'LG', 'Samsung', 'Prestige', 'Philips'],
    Books: ['Bloomsbury', 'Simon & Schuster', 'Scholastic', 'Macmillan'],
    Bathroom: ['Hindware', 'Jaquar', 'Parryware', 'Lifebuoy', 'Cera'],
    Electronics: ['Sony', 'boAt', 'JBL', 'OnePlus', 'Mi'],
    Home: ['Usha', 'Wakefit', 'Philips'],
    Toys: ['Hot Wheels', 'Lego', 'Barbie'],
    Stationery: ['Camlin', 'Faber-Castell', 'Nataraj', 'Classmate', 'Parker','Apsara']
  };
  
  const showToast = (message) => {
    setToast({ message, visible: true });
    setTimeout(() => setToast({ message: '', visible: false }), 3000);
  };

  const handleBrandChange = (brand) => {
    setSelectedBrand((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const changeQty = (id, delta) => {
    setQuantities((prev) => {
      const newQty = Math.max(0, (prev[id] || 0) + delta);
      showToast(`Quantity ${delta > 0 ? 'increased' : 'decreased'} to ${newQty}`);
      return { ...prev, [id]: newQty };
    });
  };

  const addToCart = async (product) => {
    const user = auth.currentUser;
    if (!user) return showToast('Please log in to add items to cart');

    const qty = quantities[product.id] || 0;
    if (qty === 0) return showToast('Select at least 1 quantity');

    const userRef = doc(db, 'users', user.uid);
    const snap = await getDoc(userRef);

    let updatedCart = [];

    if (snap.exists()) {
      const data = snap.data();
      const cart = data.cart || [];
      const idx = cart.findIndex((item) => item.title === product.title);

      if (idx !== -1) {
        cart[idx].quantity = qty;
        updatedCart = cart;
      } else {
        updatedCart = [...cart, { ...product, quantity: qty }];
      }

      await updateDoc(userRef, { cart: updatedCart });
    } else {
      await setDoc(userRef, { cart: [{ ...product, quantity: qty }] });
    }

    showToast(`✔️ ${product.title} (${qty}) added to cart`);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const q = query(collection(db, 'products'), where('category', '==', category));
      const snap = await getDocs(q);
      const data = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProducts(data);
      setFilteredProducts(data);

      const initialQty = {};
      data.forEach((p) => (initialQty[p.id] = 0));
      setQuantities(initialQty);
    };

    fetchProducts();
  }, [category]);

  useEffect(() => {
    let filtered = [...products];

    if (searchTerm) {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedBrand.length > 0) {
      filtered = filtered.filter((p) => selectedBrand.includes(p.brand));
    }

    if (selectedRating) {
      filtered = filtered.filter((p) => p.rating >= parseInt(selectedRating));
    }

    filtered = filtered.filter(
      (p) => p.price >= priceRange.min && p.price <= priceRange.max
    );

    setFilteredProducts(filtered);
  }, [searchTerm, products, selectedBrand, selectedRating, priceRange]);

  return (
    <div>
      <Toast message={toast.message} visible={toast.visible} />

      <h2 style={{ marginTop: '20px' }}>{category} Products</h2>

      <input
        type="text"
        placeholder="Search this category..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: '10px',
          width: '100%',
          margin: '20px 0',
          borderRadius: '6px',
          border: '1px solid #ccc',
          fontSize: '16px',
        }}
      />

      <div style={{ display: 'flex', gap: '30px' }}>
        {/* ✅ Filters */}
        <div style={{ width: '280px' }}>
          <div style={{ padding: '20px', background: '#fafafa', borderRadius: '10px', border: '1px solid #ddd' }}>
            <h3>Filters</h3>

            {/* ✅ Brand Filter (Category-Based Dropdown) */}
            {brandMap[category] && (
              <div style={{ marginTop: '20px' }}>
              <h4>You are under <strong>{category}</strong> category</h4>

                <select
                  onChange={(e) => handleBrandChange(e.target.value)}
                  style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                >
                  <option value="">Select Brand </option>
                  {brandMap[category].map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
                {selectedBrand.map((brand) => (
                  <div key={brand} style={{ fontSize: '14px' }}>
                    <input
                      type="checkbox"
                      checked
                      onChange={() => handleBrandChange(brand)}
                      style={{ marginRight: '8px' }}
                    />
                    {brand}
                  </div>
                ))}
              </div>
            )}

            <PriceFilter
              min={100}
              max={150000}
              selectedMin={priceRange.min}
              selectedMax={priceRange.max}
              onChange={setPriceRange}
            />

            <div style={{ marginTop: '20px' }}>
              <h4>Rating</h4>
              {['5', '4', '3'].map((r) => (
                <label key={r} style={{ display: 'block', marginBottom: '6px' }}>
                  <input
                    type="radio"
                    name="rating"
                    checked={selectedRating === r}
                    onChange={() => setSelectedRating(r)}
                    style={{ marginRight: '8px' }}
                  />
                  {r} & up
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* ✅ Product Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '20px',
            flex: 1,
          }}
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                style={{
                  border: '1px solid #ddd',
                  padding: '12px',
                  background: '#fff',
                  borderRadius: '10px',
                  textAlign: 'center',
                }}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  style={{ height: '150px', objectFit: 'contain' }}
                />
                <h3 style={{ fontSize: '16px', margin: '10px 0' }}>{product.title}</h3>
                <p style={{ color: 'green', fontWeight: 'bold', marginBottom: '10px' }}>
                  ₹{product.price}
                </p>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '10px',
                  }}
                >
                  <button onClick={() => changeQty(product.id, -1)}>-</button>
                  <span>{quantities[product.id] || 0}</span>
                  <button onClick={() => changeQty(product.id, 1)}>+</button>
                </div>

                <button
                  onClick={() => addToCart(product)}
                  disabled={(quantities[product.id] || 0) === 0}
                  style={{
                    padding: '8px 12px',
                    border: 'none',
                    background:
                      (quantities[product.id] || 0) === 0 ? '#ccc' : '#2874f0',
                    color: '#fff',
                    borderRadius: '4px',
                    cursor:
                      (quantities[product.id] || 0) === 0
                        ? 'not-allowed'
                        : 'pointer',
                  }}
                >
                  Add to Cart
                </button>
              </div>
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
