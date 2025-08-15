import React, { useEffect, useState, useCallback } from 'react';
import { db, auth } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import {
  GoogleAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from 'firebase/auth';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import { loadStripe } from '@stripe/stripe-js';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totals, setTotals] = useState({
    itemTotal: 0,
    discount: 0,
    platformFee: 0,
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
  const [customType, setCustomType] = useState('');
  const discountValue = 0;

  const calculateTotals = useCallback((items) => {
    const itemTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const baseDiscount = 0;
    const appliedDiscount = baseDiscount + discountValue;
    const platformFee = 0;
    const grandTotal = itemTotal - appliedDiscount + platformFee;
    setTotals({ itemTotal, discount: appliedDiscount, platformFee, grandTotal });
    setBoastMsg(null);
  }, [discountValue]);

  const mergeCartItems = (items) => {
    const merged = {};
    for (const item of items) {
      const key = item.title || item.name || JSON.stringify(item);
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
    triggerToast(`Updated quantity: ${updated[index].title || updated[index].name || 'Item'}`);
  };

  const removeItem = async (index) => {
    const updated = cartItems.filter((_, i) => i !== index);
    setCartItems(updated);
    calculateTotals(updated);
    await updateCartInDB(updated);
    triggerToast('Removed from cart');
  };

  const handleSaveAddress = () => {
    const { flat, name, mobile, type } = address;
    if (!flat || !name || !mobile.match(/^[0-9]{10}$/)) {
      alert('Fill required fields correctly.');
      return;
    }
    if (type === 'Other' && !customType.trim()) {
      alert('Please enter custom address type.');
      return;
    }
    const finalType = type === 'Other' ? customType.trim() : type;
    setSavedAddress({ ...address, type: finalType });
    triggerToast('Address saved.');
    calculateTotals(cartItems);
  };

  const handleStripeCheckout = async () => {
    const user = auth.currentUser;
    if (!user || cartItems.length === 0 || !savedAddress) {
      alert('Missing address or items.');
      return;
    }

    try {
      const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
      const response = await fetch('https://shopnix-e-commerce.onrender.com/api/stripe/create-checkout-session', {

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cartItems.map(({ title, name, price, quantity }) => ({
            name: title || name,
            price,
            quantity,
          })),
          userId: user?.uid || 'guest',
          email: user?.email || 'guest@example.com'
        }),
      });

      if (!response.ok) throw new Error('Checkout session creation failed');

      const data = await response.json();
      if (data.url) window.location.href = data.url;
      else alert('Payment initiation failed.');
    } catch (err) {
      console.error('Stripe Checkout error:', err);
      alert('Payment error occurred.');
    }
  };

  // Google Login
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      triggerToast('Logged in with Google!');
      fetchCart();
    } catch (err) {
      console.error('Google login error:', err);
    }
  };

  // Phone Login
  const handlePhoneLogin = () => {
    const phoneNumber = prompt('Enter your phone number with country code (e.g., +91XXXXXXXXXX)');
    if (!phoneNumber) return;
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      size: 'invisible',
    });
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        const code = prompt('Enter the OTP sent to your phone');
        return confirmationResult.confirm(code);
      })
      .then(() => {
        triggerToast('Logged in with Phone!');
        fetchCart();
      })
      .catch((err) => {
        console.error('Phone login error:', err);
      });
  };

  return (
    <div style={{ background: '#f9fafb', padding: 24, fontFamily: 'Inter, sans-serif', minHeight: '100vh' }}>
      <h2 style={{ fontSize: 32, fontWeight: 600, textAlign: 'center', marginBottom: 32 }}>Your Cart</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24, maxWidth: 1200, margin: 'auto' }}>
        <div>
          <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 24 }}>
            {cartItems.length === 0 ? (
              <div style={{ textAlign: 'center' }}>
                <video
                  src="/assets/emptycartem.mp4"
                  autoPlay
                  loop
                  muted
                  style={{ maxWidth: '100%', borderRadius: 8, marginBottom: 16 }}
                />
                <p style={{ fontSize: 18, fontWeight: 500, marginBottom: 16 }}>Cart is empty.</p>
                {/* <button
                  onClick={handleGoogleLogin}
                  style={{
                    background: '#4285F4',
                    color: '#fff',
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: 6,
                    marginRight: 8,
                    cursor: 'pointer',
                    fontWeight: 600
                  }}
                >
                  Login with Google
                </button>
                <button
                  onClick={handlePhoneLogin}
                  style={{
                    background: '#000',
                    color: '#fff',
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: 6,
                    cursor: 'pointer',
                    fontWeight: 600
                  }}
                >
                  Login with Phone
                </button> */}
                <div id="recaptcha-container"></div>
              </div>
            ) : (
              cartItems.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    padding: '24px 0',
                    borderBottom: index !== cartItems.length - 1 ? '1px solid #e5e7eb' : 'none',
                    gap: 24,
                  }}
                >
                  <img
                    src={item.image || ''}
                    alt={item.title || item.name}
                    style={{ width: 200, height: 140, borderRadius: 8, objectFit: 'contain', background: '#f3f4f6' }}
                    onError={(e) => { e.target.src = '/assets/default-product.png'; }}
                  />
                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: 0, fontSize: 18 }}>{item.title || item.name}</h3>
                    <p style={{ margin: '4px 0', color: '#6b7280', fontWeight: 500 }}>₹{item.price}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8 }}>
                      <RemoveCircleRoundedIcon onClick={() => changeQuantity(index, -1)} style={{ cursor: 'pointer' }} />
                      <span>{item.quantity}</span>
                      <AddCircleRoundedIcon onClick={() => changeQuantity(index, 1)} style={{ cursor: 'pointer' }} />
                      <DeleteForeverRoundedIcon
                        onClick={() => removeItem(index)}
                        style={{ color: '#ef4444', cursor: 'pointer', marginLeft: 16 }}
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Shipping Address */}
          {cartItems.length > 0 && (
            <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 24, marginTop: 24 }}>
              <h3 style={{ marginBottom: 16 }}>Shipping Address</h3>
              {!savedAddress ? (
                <>
                  {['flat', 'name', 'mobile', 'altMobile'].map((key, i) => (
                    <input
                      key={i}
                      placeholder={key === 'flat' ? 'Flat / House No' : key === 'altMobile' ? 'Alternative Number' : key === 'mobile' ? 'Mobile Number' : 'Full Name'}
                      value={address[key]}
                      onChange={(e) => setAddress({ ...address, [key]: e.target.value })}
                      style={{
                        width: '100%',
                        marginBottom: 12,
                        padding: 12,
                        fontSize: 16,
                        border: '1px solid #d1d5db',
                        borderRadius: 6,
                      }}
                    />
                  ))}
                  <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                    {['Home', 'Work', 'Other'].map((type) => (
                      <button
                        key={type}
                        onClick={() => {
                          setAddress({ ...address, type });
                          if (type !== 'Other') setCustomType('');
                        }}
                        style={{
                          flex: 1,
                          background: address.type === type ? '#000' : '#f3f4f6',
                          color: address.type === type ? '#fff' : '#111827',
                          padding: 12,
                          borderRadius: 6,
                          fontWeight: 600,
                          border: 'none',
                        }}
                      >
                        {type === 'Home' ? <HomeIcon /> : type === 'Work' ? <WorkIcon /> : '+'} {type}
                      </button>
                    ))}
                  </div>
                  {address.type === 'Other' && (
                    <input
                      placeholder="Custom Label (e.g. Parents' Home)"
                      value={customType}
                      onChange={(e) => setCustomType(e.target.value)}
                      style={{
                        width: '100%',
                        marginBottom: 12,
                        padding: 12,
                        fontSize: 16,
                        border: '1px solid #d1d5db',
                        borderRadius: 6,
                      }}
                    />
                  )}
                  <button
                    onClick={handleSaveAddress}
                    style={{
                      width: '100%',
                      background: '#000',
                      color: '#fff',
                      padding: 14,
                      fontSize: 16,
                      borderRadius: 8,
                      border: 'none',
                      fontWeight: 600,
                    }}
                  >
                    Save Address
                  </button>
                </>
              ) : (
                <div style={{ fontSize: 16 }}>
                  <p><strong>{savedAddress.name}</strong> - {savedAddress.flat}</p>
                  <p>{savedAddress.mobile} / {savedAddress.altMobile || '—'}</p>
                  <p>Type: {savedAddress.type}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {savedAddress && cartItems.length > 0 && (
          <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 24 }}>
            <h3 style={{ marginBottom: 12 }}>Order Summary</h3>
            <p>Item Total: ₹{totals.itemTotal}</p>
            <p>Discount: -₹{totals.discount}</p>
            <p>Platform Fee: ₹{totals.platformFee}</p>
            <p><strong>Delivery by: {deliveryDate}</strong></p>
            <hr style={{ margin: '12px 0', borderColor: '#e5e7eb' }} />
            <h2 style={{ fontSize: 20 }}>Total: ₹{totals.grandTotal}</h2>
            <button
              onClick={handleStripeCheckout}
              style={{
                width: '100%',
                background: '#000',
                color: '#fff',
                padding: 16,
                fontSize: 16,
                border: 'none',
                borderRadius: 8,
                marginTop: 20,
                fontWeight: 600,
              }}
            >
              Place Order →
            </button>
          </div>
        )}
      </div>

      {showToast && message && (
        <div
          style={{
            position: 'fixed',
            bottom: 30,
            right: 30,
            background: '#14b8a6',
            color: '#fff',
            padding: '16px 24px',
            borderRadius: 10,
            fontSize: 16,
            fontWeight: 500,
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default Cart;
