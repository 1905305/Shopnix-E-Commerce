import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import {
  FaShoppingCart,
  FaUserShield,
  FaSearch,
  FaEllipsisV,
  FaBell,
  FaHeadset,
  FaBullhorn,
  FaMobileAlt,
  FaBars,
} from 'react-icons/fa';

const Navbar = ({ transparent }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [user, setUser] = useState(null);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const login = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setProfileMenuOpen(false);
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search?q=${encodeURIComponent(search.trim())}`);
      setSearch('');
    }
  };

  const displayName = user?.displayName || '';
  const [firstName = '', lastName = ''] = displayName.split(' ');
  const photoURL = user?.photoURL || '/assets/default-avatar.png';

  return (
    <div style={{ position: 'fixed', top: 0, width: '100%', zIndex: 999 }}>
      {sidebarOpen && <div style={backdropStyle} onClick={() => setSidebarOpen(false)} />}

      <nav
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        style={{
          ...navbarStyle,
          background: hovering ? '#3E2C21' : '#5C4033',
          boxShadow: hovering
            ? '0 4px 12px rgba(0, 0, 0, 0.4)'
            : '0 2px 6px rgba(0, 0, 0, 0.2)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={iconButton}>
            <FaBars />
          </button>
          <img
            src="/assets/Shopnix.png"
            alt="Shopnix Logo"
            style={logoStyle}
            onClick={() => navigate('/')}
          />
        </div>

        <form onSubmit={handleSearch} style={searchFormStyle}>
          <input
            type="text"
            placeholder="Search for products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={searchInputStyle}
          />
          <button type="submit" style={searchButtonStyle}>
            <FaSearch />
          </button>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', position: 'relative', gap: '10px' }}>
          <NavButton icon={<FaShoppingCart />} label="Cart" onClick={() => navigate('/cart')} />
          <NavButton icon={<FaShoppingCart style={{ transform: 'scaleX(-1)' }} />} label="Orders" onClick={() => navigate('/orders')} />
          <NavButton icon={<FaUserShield />} onClick={() => navigate('/admin-login')} />

          {user ? (
            <div style={{ position: 'relative' }}>
              <div
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '10px' }}
              >
                <img
                  src={photoURL}
                  alt="Profile"
                  onError={(e) => (e.currentTarget.src = '/assets/default-avatar.png')}
                  style={{ height: 36, width: 36, borderRadius: '50%' }}
                />
                <span style={{ color: '#fff', fontSize: '14px' }}>{firstName} {lastName}</span>
              </div>
              {profileMenuOpen && (
                <div style={dropdownStyle}>
                  <DropdownItem icon={<FaUserShield />} label="Profile" onClick={() => navigate('/profile')} />
                  <DropdownItem icon={<FaUserShield />} label="Logout" onClick={logout} />
                </div>
              )}
            </div>
          ) : (
            <NavButton icon={<FaUserShield />} label="Login" onClick={login} />
          )}

          <div style={{ position: 'relative' }}>
            <button style={iconButton} onClick={() => setMenuOpen(!menuOpen)}>
              <FaEllipsisV />
            </button>
            {menuOpen && (
              <div style={dropdownStyle}>
                <DropdownItem icon={<FaMobileAlt />} label="Mobiles" onClick={() => navigate('/category/mobiles')} />
                <DropdownItem icon={<FaBullhorn />} label="Books" onClick={() => navigate('/category/books')} />
                <DropdownItem icon={<FaHeadset />} label="Support" onClick={() => navigate('/support')} />
                <DropdownItem icon={<FaBell />} label="Notifications" onClick={() => navigate('/notifications')} />
              </div>
            )}
          </div>
        </div>
      </nav>

      {sidebarOpen && (
        <div style={sidebarStyle}>
          <SidebarGroup title="TRENDING" items={['Bestsellers', 'New Releases', 'Movers and Shakers']} />
          <SidebarGroup
            title="SHOP BY CATEGORY"
            items={['Sports', 'Stationery', 'Fashion', 'Books', 'Kitchen', 'Appliances', 'Grocery', 'Mobiles', 'Toys', 'Beauty', 'Laptops', 'Electronics', 'Home']}
          />
          <SidebarGroup title="PROGRAMS & FEATURES" items={['Amazon Pay', 'Gift Cards & Mobile Recharges']} />
          <SidebarGroup title="HELP & SETTINGS" items={['Your Account', 'Customer Service', 'Sign In']} />
        </div>
      )}
    </div>
  );
};

// Helper components
const NavButton = ({ icon, label, onClick }) => (
  <button style={iconButton} onClick={onClick}>
    {icon} {label && <span>{label}</span>}
  </button>
);

const DropdownItem = ({ icon, label, onClick }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      padding: '10px 16px',
      color: '#fff',
      fontSize: '14px',
      cursor: 'pointer',
      gap: '10px',
    }}
    onClick={onClick}
  >
    {icon}
    {label}
  </div>
);

const SidebarGroup = ({ title, items }) => {
  const navigate = useNavigate();
  return (
    <div style={{ marginBottom: '20px' }}>
      <h4 style={{ color: '#fff', marginBottom: '10px', fontWeight: 'bold', fontSize: '15px' }}>{title}</h4>
      {items.map((item, i) => (
        <div
          key={i}
          onClick={() => {
            const lower = item.toLowerCase().replace(/\s+/g, '');
            if (title.includes('CATEGORY')) {
              navigate(`/category/${lower}`);
            } else {
              navigate('/');
            }
          }}
          style={{
            color: '#ccc',
            padding: '4px 0',
            fontSize: '14px',
            cursor: 'pointer',
          }}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

// STYLES
const navbarStyle = {
  width: '100%',
  padding: '14px 40px',
  color: '#fff',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontFamily: 'sans-serif',
  flexWrap: 'wrap',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  transition: 'all 0.3s ease-in-out',
};

const logoStyle = {
  height: 48,
  maxWidth: 160,
  objectFit: 'contain',
  cursor: 'pointer',
  opacity: 0.9,
};

const iconButton = {
  marginLeft: '12px',
  padding: '8px 14px',
  background: 'rgba(255,255,255,0.1)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '6px',
  color: '#fff',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  fontSize: '14px',
};

const dropdownStyle = {
  position: 'absolute',
  top: '110%',
  right: 0,
  background: '#333',
  border: '1px solid #555',
  borderRadius: '6px',
  padding: '10px 0',
  minWidth: '200px',
  zIndex: 1000,
};

const sidebarStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  height: '100vh',
  width: '260px',
  background: '#222',
  borderRight: '1px solid #444',
  padding: '20px',
  zIndex: 999,
  overflowY: 'auto',
};

const backdropStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.3)',
  zIndex: 998,
};

const searchFormStyle = {
  flexGrow: 1,
  maxWidth: '420px',
  margin: '0 30px',
  display: 'flex',
};

const searchInputStyle = {
  flexGrow: 1,
  padding: '10px 14px',
  borderRadius: '6px 0 0 6px',
  border: '1px solid rgba(255,255,255,0.2)',
  outline: 'none',
  color: '#fff',
  background: '#4A2F1E',
};

const searchButtonStyle = {
  background: '#3E2C21',
  color: '#fff',
  border: '1px solid rgba(255,255,255,0.2)',
  padding: '10px 14px',
  borderRadius: '0 6px 6px 0',
  cursor: 'pointer',
};

export default Navbar;
