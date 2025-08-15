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
import Orders from './pages/OrderHistory';
import Cart from './pages/Cart';
import Success from './pages/Success';
import Cancel from './pages/Cancel';
import Profile from './pages/Profile';
import SingleProductPage from './pages/SingleProductPage';
import About from './pages/About';
import Careers from './pages/Careers';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import FAQs from './pages/faqs';
import Shipping from './pages/shipping';
import Returns from './pages/returns';
import Tracking from './pages/tracking';
import Privacy from './pages/privacy';
import Terms from './pages/terms';
import Cookies from './pages/cookies';
import NewArrivals from './pages/NewArrivals';
import BestSellers from './pages/BestSellers';
import DynamicTitle from "./components/DynamicTitle";
import ScratchCards from './pages/ScratchCards';
import GiftCard from './pages/Giftcard'; // match the actual file name
import CustomerService from './pages/CustomerService'; // <-- import the page



// Stripe
import { Elements } from '@stripe/react-stripe-js';
import stripePromise from './stripe';

// ✅ Import our Chatbot
import ChatWidget from './components/ChatWidget';

// ✅ Import HelmetProvider
import { HelmetProvider } from "react-helmet-async";

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
    <HelmetProvider>
      <Router>
        <CartProvider>
          <Elements stripe={stripePromise}>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              
              {/* ✅ Works globally */}
              <DynamicTitle />

              <NavbarWithVideo />

              <main style={{ flex: 1, background: '#f1f3f6' }}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products/:category" element={<Products />} />
                  <Route path="/product/:id" element={<SingleProductPage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/admin-login" element={<AdminLogin />} />
                  <Route path="/cart" element={user ? <Cart /> : <Navigate to="/login" />} />
                  <Route path="/orders" element={user ? <Orders /> : <Navigate to="/login" />} />
                  <Route path="/admin" element={isAdmin ? <Admin /> : <Navigate to="/admin-login" />} />
                  <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
                  <Route path="/success" element={<Success />} />
                  <Route path="/cancel" element={<Cancel />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/careers" element={<Careers />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/faqs" element={<FAQs />} />
                  <Route path="/shipping" element={<Shipping />} />
                  <Route path="/returns" element={<Returns />} />
                  <Route path="/tracking" element={<Tracking />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/cookies" element={<Cookies />} />
                  <Route path="/new-arrivals" element={<NewArrivals />} />
                  <Route path="/best-sellers" element={<BestSellers />} />
                  <Route path="/scratch-cards" element={<ScratchCards />} />
                  <Route path="/giftcard" element={<GiftCard />} />
                  <Route path="/customer-service" element={<CustomerService />} /> {/* <-- route */}

                </Routes>
              </main>

              <Footer />
            </div>

            {/* ✅ Chatbot mounted globally */}
            <ChatWidget />
          </Elements>
        </CartProvider>
      </Router>
    </HelmetProvider>
  );
}

export default App;
