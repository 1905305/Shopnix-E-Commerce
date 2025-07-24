import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';

import { AuthContext } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import Login from './pages/Login';
import AdminLogin from './pages/AdminLogin';
import Admin from './pages/Admin';
import Orders from './pages/Orders';
import Cart from './pages/Cart';

// Stripe
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const ADMIN_UID = 'wPDMZRDkBtPiocHPCa0VKDs3cl43';

const NavbarWithVideo = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <>
      {isHome && (
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100vh',
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
              height: '100%',
              objectFit: 'cover',
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: -1,
            }}
          >
            <source src="/assets/banner-video.mp4" type="video/mp4" />
          </video>
          <div
            style={{
              height: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Navbar transparent />
          </div>
        </div>
      )}
      {!isHome && <Navbar />}
    </>
  );
};

function App() {
  const { user } = useContext(AuthContext);
  const isAdmin = user?.uid === ADMIN_UID;

  return (
    <Router>
      <CartProvider>
        <Elements stripe={stripePromise}>
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <NavbarWithVideo />

            <main style={{ flex: 1, background: '#f1f3f6' }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products/:category" element={<Products />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route path="/cart" element={user ? <Cart /> : <Navigate to="/login" />} />
                <Route path="/orders" element={user ? <Orders /> : <Navigate to="/login" />} />
                <Route path="/admin" element={isAdmin ? <Admin /> : <Navigate to="/admin-login" />} />
              </Routes>
            </main>

            <Footer />
          </div>
        </Elements>
      </CartProvider>
    </Router>
  );
}

export default App;
