import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, googleProvider, db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

import {
  ShoppingCartOutlined,
  AssignmentOutlined,
  AdminPanelSettingsOutlined,
  Menu as MenuIcon,
  MoreVert,
  Search,
  Notifications,
  SupportAgent,
  Campaign,
  Smartphone,
  Close,
} from "@mui/icons-material";

const Navbar = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [user, setUser] = useState(null);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const storedSearches =
      JSON.parse(localStorage.getItem("recentSearches")) || [];
    setRecentSearches(storedSearches);
  }, []);

  useEffect(() => {
    if (search.trim() === "") {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      const q = query(
        collection(db, "products"),
        where("keywords", "array-contains", search.toLowerCase())
      );

      try {
        const snapshot = await getDocs(q);
        const results = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSuggestions(results);
      } catch (err) {
        console.error("Search error:", err);
      }
    };

    fetchSuggestions();
  }, [search]);

  const login = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setProfileMenuOpen(false);
      setSidebarOpen(false);
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setProfileMenuOpen(false);
      navigate("/");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const updateRecentSearches = (term) => {
    if (!term.trim()) return;
    const updated = [
      term,
      ...recentSearches.filter((item) => item !== term),
    ].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  const removeRecentSearch = (term) => {
    const updated = recentSearches.filter((item) => item !== term);
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmed = search.trim();
    if (trimmed) {
      updateRecentSearches(trimmed);
      navigate(`/search?q=${encodeURIComponent(trimmed)}`);
      setSearch("");
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (product) => {
    navigate(`/product/${product.id}`);
    setSearch("");
    setSuggestions([]);
  };

  const displayName = user?.displayName || "";
  const [firstName = "", lastName = ""] = displayName.split(" ");
  const photoURL = user?.photoURL?.startsWith("http")
    ? user.photoURL
    : "/assets/default-avatar.png";

  return (
    <div style={{ position: "fixed", top: 0, width: "100%", zIndex: 999 }}>
      {sidebarOpen && (
        <div style={backdropStyle} onClick={() => setSidebarOpen(false)} />
      )}
      <nav
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        style={{
          ...navbarStyle,
          background: "rgb(0 0 0)",
          boxShadow: hovering
            ? "0 4px 12px rgba(255, 204, 153, 0.3)"
            : "0 2px 6px rgba(0, 0, 0, 0.2)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={iconButton}
          >
            <MenuIcon fontSize="small" />
          </button>
          <img
            src="/assets/Shopnix.png"
            alt="Shopnix Logo"
            style={logoStyle}
            onClick={() => navigate("/")}
          />
        </div>

        <form
          onSubmit={handleSearch}
          style={{ ...searchFormStyle, position: "relative" }}
        >
          <input
            type="text"
            placeholder="Search for products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={searchInputStyle}
          />
          <button type="submit" style={searchButtonStyle}>
            <Search fontSize="small" />
          </button>

          {(suggestions.length > 0 || recentSearches.length > 0) && (
            <div style={suggestionBoxStyle}>
              {recentSearches.length > 0 && (
                <div
                  style={{ padding: "10px", borderBottom: "1px solid #ddd" }}
                >
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: "bold",
                      marginBottom: "6px",
                    }}
                  >
                    Recent Searches
                  </div>
                  {recentSearches.map((term, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "6px 0",
                        fontSize: "13px",
                        cursor: "pointer",
                      }}
                    >
                      <span onClick={() => setSearch(term)}>{term}</span>
                      <Close
                        style={{
                          fontSize: "16px",
                          cursor: "pointer",
                          color: "#999",
                        }}
                        onClick={() => removeRecentSearch(term)}
                      />
                    </div>
                  ))}
                </div>
              )}
              {suggestions.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleSuggestionClick(product)}
                  style={{
                    padding: "10px",
                    cursor: "pointer",
                    borderBottom: "1px solid #ddd",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    background: "#fff",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#eee")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "#fff")
                  }
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    style={{
                      width: 40,
                      height: 40,
                      objectFit: "cover",
                      borderRadius: 4,
                    }}
                  />
                  <div>
                    <div style={{ fontWeight: 500 }}>{product.title}</div>
                    <div style={{ fontSize: "12px", color: "#666" }}>
                      {product.brand}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </form>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            position: "relative",
            gap: "10px",
          }}
        >
          <NavButton
            icon={<ShoppingCartOutlined fontSize="small" />}
            label="Cart"
            onClick={() => navigate("/cart")}
          />
          <NavButton
            icon={<AssignmentOutlined fontSize="small" />}
            label="Orders"
            onClick={() => navigate("/orders")}
          />
          <NavButton
            icon={<AdminPanelSettingsOutlined fontSize="small" />}
            label="Admin"
            onClick={() => navigate("/admin-login")}
          />

          {user ? (
            <div style={{ position: "relative" }}>
              <div
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  gap: "10px",
                }}
              >
                <img
                  src={photoURL}
                  alt="Profile"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/assets/default-avatar.png";
                  }}
                  style={{
                    height: 36,
                    width: 36,
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
                <span style={{ color: "#fff", fontSize: "14px" }}>
                  {firstName} {lastName}
                </span>
              </div>
              {profileMenuOpen && (
                <div style={dropdownStyle}>
                  <DropdownItem
                    icon={<AdminPanelSettingsOutlined fontSize="small" />}
                    label="Profile"
                    onClick={() => navigate("/profile")}
                  />
                  <DropdownItem
                    icon={<AdminPanelSettingsOutlined fontSize="small" />}
                    label="Logout"
                    onClick={logout}
                  />
                </div>
              )}
            </div>
          ) : (
            <NavButton
              icon={<AdminPanelSettingsOutlined fontSize="small" />}
              label="Login"
              onClick={login}
            />
          )}

          <div style={{ position: "relative" }}>
            <button style={iconButton} onClick={() => setMenuOpen(!menuOpen)}>
              <MoreVert fontSize="small" />
            </button>
            {menuOpen && (
              <div style={dropdownStyle}>
                <DropdownItem
                  icon={<Smartphone fontSize="small" />}
                  label="Mobiles"
                  onClick={() => navigate("/category/mobiles")}
                />
                <DropdownItem
                  icon={<Campaign fontSize="small" />}
                  label="Books"
                  onClick={() => navigate("/category/books")}
                />
                <DropdownItem
                  icon={<SupportAgent fontSize="small" />}
                  label="Support"
                  onClick={() => navigate("/support")}
                />
                <DropdownItem
                  icon={<Notifications fontSize="small" />}
                  label="Notifications"
                  onClick={() => navigate("/notifications")}
                />
              </div>
            )}
          </div>
        </div>
      </nav>

      {sidebarOpen && (
        <div style={sidebarStyle}>
          <SidebarGroup
            title="TRENDING"
            items={[
              <Link key="all" style={linkStyle} to="/">
                All
              </Link>,
              <Link key="new-arrivals" style={linkStyle} to="/new-arrivals">
                New Arrivals
              </Link>,
              <Link key="best-sellers" style={linkStyle} to="/best-sellers">
                Best Sellers
              </Link>,
            ]}
          />
          <SidebarGroup
            title="SHOP BY CATEGORY"
            items={[
              "Sports",
              "Stationery",
              "Fashion",
              "Books",
              "Kitchen",
              "Appliances",
              "Grocery",
              "Mobiles",
              "Toys",
              "Beauty",
              "Bathroom",
              "Laptops",
              "Electronics",
              "Home",
            ]}
          />
          <SidebarGroup
            title="PROGRAMS & FEATURES"
            items={[
              <Link key="scratch-cards" style={linkStyle} to="/scratch-cards">
                Scratch Cards
              </Link>,

              <Link key="gift-card" style={linkStyle} to="/giftcard">
                Gift Cards
              </Link>,
            ]}
          />

          <SidebarGroup
            title="HELP & SETTINGS"
            items={[
              "Your Account",
              <Link
                key="customer-service"
                style={linkStyle}
                to="/customer-service"
              >
                Customer Service
              </Link>,
              { label: "Login", action: login }, // custom action for Login here
            ]}
            
          />
        </div>
      )}
    </div>
  );
};

const NavButton = ({ icon, label, onClick }) => (
  <button style={iconButton} onClick={onClick}>
    {icon} {label && <span>{label}</span>}
  </button>
);

const DropdownItem = ({ icon, label, onClick }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      padding: "10px 16px",
      color: "#fff",
      fontSize: "14px",
      cursor: "pointer",
      gap: "10px",
      transition: "background 0.3s ease-in-out",
    }}
    onClick={onClick}
    onMouseEnter={(e) => (e.currentTarget.style.background = "#a0522d33")}
    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
  >
    {icon}
    {label}
  </div>
);

const SidebarGroup = ({ title, items }) => {
  const navigate = useNavigate();
  const isCategory = title === "SHOP BY CATEGORY";

  return (
    <div style={{ marginBottom: "20px" }}>
      <h4
        style={{
          color: "#fff",
          marginBottom: "10px",
          fontWeight: "bold",
          fontSize: "15px",
        }}
      >
        {title}
      </h4>
      {items.map((item, i) => {
        if (React.isValidElement(item)) {
          // If item is a React Link element, render directly
          return (
            <div key={i} style={{ padding: "4px 0", fontSize: "14px" }}>
              {item}
            </div>
          );
        }

        // If item is an object with action, use onClick
        if (typeof item === "object" && item !== null && item.action) {
          return (
            <div
              key={i}
              onClick={() => {
                item.action();
              }}
              style={{
                color: "#ccc",
                padding: "4px 0",
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              {item.label}
            </div>
          );
        }

        // Otherwise, regular string item (category or others)
        return (
          <div
            key={i}
            onClick={() => {
              if (isCategory) {
                navigate(`/products/${item}`);
              } else {
                navigate("/");
              }
            }}
            style={{
              color: "#ccc",
              padding: "4px 0",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
};

// ---------------------- Styles ----------------------

const navbarStyle = {
  width: "100%",
  padding: "14px 40px",
  color: "#fff",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontFamily: "sans-serif",
  flexWrap: "wrap",
  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
  transition: "all 0.3s ease-in-out",
};

const logoStyle = {
  height: 50,
  width: 100,
  objectFit: "contain",
  cursor: "pointer",
  opacity: 0.9,
};

const iconButton = {
  marginLeft: "12px",
  padding: "8px 14px",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "6px",
  color: "#fff",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "5px",
  fontSize: "14px",
  transition: "all 0.3s ease-in-out",
};

const dropdownStyle = {
  position: "absolute",
  top: "110%",
  right: 0,
  background: "#222",
  border: "1px solid #555",
  borderRadius: "6px",
  padding: "10px 0",
  minWidth: "200px",
  zIndex: 1000,
};

const sidebarStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  height: "100vh",
  width: "260px",
  background: "#111",
  borderRight: "1px solid #444",
  padding: "20px",
  zIndex: 999,
  overflowY: "auto",
};

const backdropStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.3)",
  zIndex: 998,
};

const searchFormStyle = {
  flexGrow: 1,
  maxWidth: "420px",
  margin: "0 30px",
  display: "flex",
  position: "relative",
};

const searchInputStyle = {
  flexGrow: 1,
  padding: "10px 16px",
  borderRadius: "6px 0 0 6px",
  border: "1px solid rgba(255,255,255,0.3)",
  outline: "none",
  color: "#000",
  background: "#fff",
  fontSize: "14px",
};

const searchButtonStyle = {
  background: "#fff",
  color: "#000",
  border: "1px solid rgba(255,255,255,0.3)",
  padding: "10px 16px",
  borderRadius: "0 6px 6px 0",
  cursor: "pointer",
};

const suggestionBoxStyle = {
  position: "absolute",
  top: "100%",
  left: 0,
  width: "100%",
  background: "#fff",
  border: "1px solid #ccc",
  zIndex: 1000,
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
};

const linkStyle = {
  color: "#ccc",
  textDecoration: "none",
  display: "block",
  padding: "4px 0",
  fontSize: "14px",
  cursor: "pointer",
};

export default Navbar;
