import React, { useEffect, useState } from 'react';
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
const Toast = ({ message, visible }) => {
  return (
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
};

const Products = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [quantities, setQuantities] = useState({});
  const [toast, setToast] = useState({ message: '', visible: false });

  useEffect(() => {
    const fetchProducts = async () => {
      const q = query(collection(db, 'products'), where('category', '==', category));
      const snap = await getDocs(q);
      const result = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(result);
      setFilteredProducts(result);

      const initialQuantities = {};
      result.forEach(p => { initialQuantities[p.id] = 0; });
      setQuantities(initialQuantities);
    };
    fetchProducts();
  }, [category]);

  useEffect(() => {
    const filtered = products.filter(p =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  const showToast = (msg) => {
    setToast({ message: msg, visible: true });
    setTimeout(() => setToast({ ...toast, visible: false }), 4000); // 👈 disappears in 4 seconds
  };

  const changeQty = (id, delta) => {
    setQuantities(q => ({
      ...q,
      [id]: Math.max(0, (q[id] || 0) + delta)
    }));

    const newQty = Math.max(0, (quantities[id] || 0) + delta);
    showToast(`Quantity ${delta > 0 ? 'increased' : 'decreased'} to ${newQty}`);
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
      const idx = cart.findIndex(item => item.title === product.title);

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

  return (
    <div>
      {/* 🔥 Toast Message */}
      <Toast message={toast.message} visible={toast.visible} />

      <h2>{category} Products</h2>

      <input
        type="text"
        placeholder="Search this category..."
        style={{
          padding: '10px',
          width: '100%',
          margin: '20px 0',
          borderRadius: '4px',
          border: '1px solid #ccc',
          fontSize: '16px'
        }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '20px',
        marginTop: '20px'
      }}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div key={product.id} style={{
              border: '1px solid #ccc',
              padding: '10px',
              background: '#fff',
              borderRadius: '8px',
              textAlign: 'center',
              transition: 'transform 0.3s',
            }}>
              <img src={product.image} alt={product.title} style={{ height: '150px', objectFit: 'contain' }} />
              <h3>{product.title}</h3>
              <p style={{ color: 'green', fontWeight: 'bold' }}>₹{product.price}</p>

              {/* Quantity Controls */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '10px',
                margin: '10px 0'
              }}>
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
                  background: (quantities[product.id] || 0) === 0 ? '#ccc' : '#2874f0',
                  color: '#fff',
                  borderRadius: '4px',
                  cursor: (quantities[product.id] || 0) === 0 ? 'not-allowed' : 'pointer'
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
  );
};

export default Products;
