import React, { useEffect, useState, useCallback } from 'react';
import { db, auth } from '../firebase';
import {
  doc, getDoc, updateDoc, addDoc, collection, serverTimestamp
} from 'firebase/firestore';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import DeleteIcon from '@mui/icons-material/Delete';
import { loadStripe } from '@stripe/stripe-js'; // ✅ Stripe import

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totals, setTotals] = useState({
    itemTotal: 0,
    discount: 0,
    platformFee: 30,
    grandTotal: 0,
  });
  const [message, setMessage] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [boastMsg, setBoastMsg] = useState(null);
  const [address, setAddress] = useState({
    flat: '', name: '', mobile: '', altMobile: '', type: 'Home',
  });
  const [savedAddress, setSavedAddress] = useState(null);
  const [deliveryDate, setDeliveryDate] = useState('');
  const [useNix, setUseNix] = useState(false);
  const discountValue = useNix ? 100 : 0;

  const brown = '#8B4513';
  const lightBrown = '#f5f2ec';

  const calculateTotals = useCallback((items) => {
    const itemTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const baseDiscount = Math.floor(itemTotal * 0.1);
    const appliedDiscount = baseDiscount + discountValue;
    const platformFee = items.length > 0 ? 30 : 0;
    const grandTotal = itemTotal - appliedDiscount + platformFee;
    setTotals({ itemTotal, discount: appliedDiscount, platformFee, grandTotal });
    setBoastMsg(`You're saving ₹${appliedDiscount}`);
  }, [discountValue]);

  const mergeCartItems = (items) => {
    const merged = {};
    for (const item of items) {
      const key = item.title;
      if (merged[key]) {
        merged[key].quantity += item.quantity || 1;
      } else {
        merged[key] = { ...item, quantity: item.quantity || 1 };
      }
    }
    return Object.values(merged);
  };

  const fetchCart = useCallback(async () => {
    const user = auth.currentUser;
    if (!user) return;
    const snap = await getDoc(doc(db, 'users', user.uid));
    if (snap.exists()) {
      const data = snap.data();
      const merged = mergeCartItems(data.cart || []);
      setCartItems(merged);
      calculateTotals(merged);
    }
  }, [calculateTotals]);

  useEffect(() => {
    fetchCart();
    const date = new Date();
    date.setDate(date.getDate() + 3 + Math.floor(Math.random() * 2));
    setDeliveryDate(date.toDateString());
  }, [fetchCart]);

  const updateCartInDB = async (updatedCart) => {
    const user = auth.currentUser;
    if (!user) return;
    await updateDoc(doc(db, 'users', user.uid), { cart: updatedCart });
  };

  const triggerToast = (msg) => {
    setMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  const changeQuantity = async (index, delta) => {
    const updated = [...cartItems];
    updated[index].quantity = Math.max(1, updated[index].quantity + delta);
    setCartItems(updated);
    calculateTotals(updated);
    await updateCartInDB(updated);
    triggerToast(`Updated quantity: ${updated[index].title}`);
  };

  const removeItem = async (index) => {
    const updated = cartItems.filter((_, i) => i !== index);
    setCartItems(updated);
    calculateTotals(updated);
    await updateCartInDB(updated);
    triggerToast(`Removed from cart`);
  };

  const handleSaveAddress = () => {
    const { flat, name, mobile } = address;
    if (!flat || !name || !mobile.match(/^\d{10}$/)) {
      alert('Fill required fields correctly.');
      return;
    }
    setSavedAddress(address);
    triggerToast('Address saved.');
    calculateTotals(cartItems);
  };

    // ✅ STRIPE PAYMENT FUNCTION
    const handleStripeCheckout = async () => {
      const user = auth.currentUser;
      if (!user || cartItems.length === 0 || !savedAddress) {
        alert('Missing address or items.');
        return;
      }
  
      try {
        const stripe = await loadStripe('pk_test_51RoLHnAtXc12QcbOMrwq4UGU7hOchicybjRvhP3CKKgnwtl6Cgkysl0wQmBbf3OIRP0jgWamVhagAXAndZCv213f00LzKFMuNK'); // ✅ Real publishable key
  
        const response = await fetch('http://localhost:5000/create-checkout-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: totals.grandTotal * 100, // Stripe uses smallest currency unit (₹ -> paise)
            cartItems,
            address: savedAddress,
            userId: user.uid,
          }),
        });
  
        const data = await response.json();
  
        if (data.url) {
          window.location.href = data.url; // Stripe Checkout redirect
        } else {
          alert('Payment initiation failed.');
        }
      } catch (err) {
        console.error('Stripe Checkout error:', err);
        alert('Payment error occurred.');
      }
    };
  

  return (
    <div style={{ padding: 24, maxWidth: 900, margin: 'auto', background: lightBrown }}>
      <h2 style={{ color: brown }}>Your Cart</h2>

      {cartItems.length === 0 && (
        <div style={{ padding: 20, textAlign: 'center', fontSize: 18, color: '#666' }}>
          Cart is empty.
        </div>
      )}

      {cartItems.length > 0 && (
        <div style={{ border: `1px solid ${brown}`, padding: 20, borderRadius: 10, marginBottom: 24 }}>
          {cartItems.map((item, index) => (
            <div key={index} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              borderBottom: '1px solid #ddd', padding: '16px 0'
            }}>
              <img src={item.image} alt={item.title} width={100} height={100} style={{ borderRadius: 8 }} />
              <div style={{ flex: 1, marginLeft: 20 }}>
                <h3 style={{ margin: 0 }}>{item.title}</h3>
                <p style={{ margin: '4px 0' }}>₹{item.price}</p>
              </div>
              <div>
                <button onClick={() => changeQuantity(index, -1)}>-</button>
                <span style={{ margin: '0 12px', fontSize: 16 }}>{item.quantity}</span>
                <button onClick={() => changeQuantity(index, 1)}>+</button>
              </div>
              <DeleteIcon style={{ cursor: 'pointer', color: brown }} onClick={() => removeItem(index)} />
            </div>
          ))}
        </div>
      )}

      {cartItems.length > 0 && (
        <div style={{ border: `1px solid ${brown}`, padding: 20, borderRadius: 10, marginBottom: 24 }}>
          <h3 style={{ marginBottom: 12, color: brown }}>Deliver To</h3>
          {!savedAddress ? (
            <>
              <input placeholder="Flat / House No" value={address.flat} onChange={(e) => setAddress({ ...address, flat: e.target.value })} style={{ width: '100%', marginBottom: 10, padding: 12, fontSize: 16 }} />
              <input placeholder="Full Name" value={address.name} onChange={(e) => setAddress({ ...address, name: e.target.value })} style={{ width: '100%', marginBottom: 10, padding: 12, fontSize: 16 }} />
              <input placeholder="Mobile Number" maxLength="10" value={address.mobile} onChange={(e) => setAddress({ ...address, mobile: e.target.value })} style={{ width: '100%', marginBottom: 10, padding: 12, fontSize: 16 }} />
              <input placeholder="Alternative Number" maxLength="10" value={address.altMobile} onChange={(e) => setAddress({ ...address, altMobile: e.target.value })} style={{ width: '100%', marginBottom: 12, padding: 12, fontSize: 16 }} />

              <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                <button onClick={() => setAddress({ ...address, type: 'Home' })} style={{ flex: 1, background: address.type === 'Home' ? brown : '#ddd', color: 'white', padding: 12, border: 'none', borderRadius: 6 }}>
                  <HomeIcon /> Home
                </button>
                <button onClick={() => setAddress({ ...address, type: 'Work' })} style={{ flex: 1, background: address.type === 'Work' ? brown : '#ddd', color: 'white', padding: 12, border: 'none', borderRadius: 6 }}>
                  <WorkIcon /> Work
                </button>
              </div>

              <button onClick={handleSaveAddress} style={{ width: '100%', background: brown, color: 'white', padding: 14, fontSize: 16, borderRadius: 6, border: 'none' }}>Save Address</button>
            </>
          ) : (
            <div style={{ fontSize: 16, color: '#333' }}>
              <p><strong>{savedAddress.name}</strong> - {savedAddress.flat}</p>
              <p>{savedAddress.mobile} / {savedAddress.altMobile || '—'}</p>
              <p>Type: {savedAddress.type}</p>
            </div>
          )}
        </div>
      )}

      {savedAddress && cartItems.length > 0 && (
        <>
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 16 }}>
              <input type="checkbox" checked={useNix} onChange={() => setUseNix(!useNix)} style={{ marginRight: 8 }} />
              Use 100 Nix Coins (₹100 Off)
            </label>
          </div>

          <div style={{ padding: 20, border: `1px solid ${brown}`, borderRadius: 10 }}>
            <h3 style={{ color: brown }}>Order Summary</h3>
            <p>Item Total: ₹{totals.itemTotal}</p>
            <p>Discount: -₹{totals.discount}</p>
            <p>Platform Fee: ₹{totals.platformFee}</p>
            <p><strong>Delivery by: {deliveryDate}</strong></p>
            <hr />
            <h2>Total Payable: ₹{totals.grandTotal}</h2>

            <button
              onClick={handleStripeCheckout}
              style={{ background: brown, color: '#fff', padding: 14, fontSize: 16, border: 'none', borderRadius: 6, marginTop: 20 }}
            >
              Continue
            </button>
          </div>
        </>
      )}

      {showToast && message && (
        <div style={{ position: 'fixed', bottom: 30, right: 30, background: brown, color: 'white', padding: '16px 24px', borderRadius: 8, fontSize: 16 }}>
          {message}
        </div>
      )}

      {savedAddress && boastMsg && (
        <div style={{ marginTop: 20, background: '#e0d6cd', color: brown, padding: 16, borderRadius: 6, fontWeight: 'bold' }}>
          {boastMsg}
        </div>
      )}
    </div>
  );
};

export default Cart;
