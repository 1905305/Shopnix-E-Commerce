import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { FaStar, FaRegStar, FaHeadset, FaTag, FaMoneyBillWave, FaBolt, FaRupeeSign, FaCreditCard } from "react-icons/fa";

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedStorage, setSelectedStorage] = useState("");
  const [colorOpen, setColorOpen] = useState(false);
  const [storageOpen, setStorageOpen] = useState(false);
  const [basePrice, setBasePrice] = useState(0);
  const [exchangeOption, setExchangeOption] = useState("without");

  useEffect(() => {
    const fetchProduct = async () => {
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setProduct(data);

        if (data.images?.length > 0) setSelectedImage(data.images[0]);
        else setSelectedImage(data.image);

        if (data.colors?.length > 0) setSelectedColor(data.colors[0]);

        if (data.storageOptions?.length > 0) {
          const defaultStorage = data.storageOptions[0];
          setSelectedStorage(defaultStorage);
          if (data.prices && data.prices[defaultStorage]) setBasePrice(data.prices[defaultStorage]);
          else if (data.price) setBasePrice(data.price);
        } else if (data.price) setBasePrice(data.price);
      } else {
        console.error("No such product!");
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <div style={styles.loading}>Loading...</div>;

  const displayPrice =
    (product.prices && product.prices[selectedStorage]) ||
    basePrice ||
    product.price ||
    129999;

  const mediaItems = [...(product.images || [product.image])];
  if (product.video) mediaItems.push("VIDEO_THUMBNAIL");

  const offers = product.offers || [
    "Bank Offer 5% cashback on Flipkart Axis Bank Credit Card upto ₹4,000 per statement quarter",
    "Bank Offer 5% cashback on Axis Bank Flipkart Debit Card up to ₹750",
    "Bank Offer Up To ₹30 Instant Cashback on BHIM Payments App. Min Order Value ₹199. Offer Valid Once Per User",
    "Special Price Get extra ₹7000 off (price inclusive of cashback/coupon)",
    "Bank Offer Flat ₹10 Instant Cashback on Paytm UPI Trxns. Min Order Value ₹199. Valid once per Paytm account",
    "EMI starting from ₹5,024/month"
  ];

  // Check category for showing exchange options (case-insensitive)
  const exchangeCategories = ["mobiles", "laptop", "appliances"];
  const categoryLower = product.category?.toLowerCase() || "";
  const showExchangeOptions = exchangeCategories.includes(categoryLower);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{product.title}</h1>

      <div style={styles.productWrapper}>
        <div style={styles.leftColumn}>
          <div style={styles.imageSection}>
            {selectedImage === "VIDEO_THUMBNAIL" ? (
              <div style={{ width: "100%", maxWidth: 600, margin: "0 auto 20px auto" }}>
                <div style={{ position: "relative", width: "100%", paddingBottom: "100%" }}>
                  <iframe
                    src="https://www.youtube.com/embed/dxxFhAtN018"
                    title={product.title}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      borderRadius: 12,
                      border: "none",
                    }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            ) : (
              <img src={selectedImage} alt={product.title} style={styles.mainImage} />
            )}

            <div style={styles.thumbnailRow}>
              {mediaItems.map((item, idx) =>
                item === "VIDEO_THUMBNAIL" ? (
                  <div
                    key={idx}
                    style={{
                      ...styles.thumbnail,
                      width: 80,
                      height: 80,
                      backgroundColor: "#000",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      fontSize: 28,
                      fontWeight: "bold",
                      borderRadius: 12,
                    }}
                    onClick={() => setSelectedImage("VIDEO_THUMBNAIL")}
                  >
                    ▶
                  </div>
                ) : (
                  <img
                    key={idx}
                    src={item}
                    alt={`thumb-${idx}`}
                    style={{
                      ...styles.thumbnail,
                      width: 80,
                      height: 80,
                      border: selectedImage === item ? "2.5px solid #000" : "1.5px solid #ccc",
                      borderRadius: 12,
                      cursor: "pointer",
                      objectFit: "cover",
                    }}
                    onClick={() => setSelectedImage(item)}
                  />
                )
              )}
            </div>
          </div>

          {/* Specifications below image/video */}
          <div style={styles.specsContainer}>
            <h3 style={styles.specsTitle}>Specifications</h3>
            {product?.specs &&
              Object.entries(product.specs).map(([key, value]) => (
                <div key={key} style={styles.specSection}>
                  <strong>{key}:</strong> {value}
                </div>
              ))}

            {/* Buttons directly below specs */}
            <div style={styles.buttonsRow}>
              <button style={styles.addToCartBtn}>Add to Cart</button>
              <button style={styles.buyNowBtn}>Buy Now</button>
            </div>
          </div>
        </div>

        <div style={styles.rightColumn}>
          <p style={styles.brand}>Brand: <strong>{product.brand}</strong></p>
          <p style={styles.category}>Category: <strong>{product.category}</strong></p>
          <p style={styles.price}>Price: ₹{displayPrice.toLocaleString()}</p>

          <div style={styles.offersContainer}>
            <h3 style={styles.offersTitle}>Available Offers</h3>
            <ul style={styles.offersList}>
              {offers.map((offer, idx) => {
                let icon = null;
                if (offer.toLowerCase().includes("bank offer")) icon = <FaCreditCard style={styles.offerIcon} />;
                else if (offer.toLowerCase().includes("special price")) icon = <FaBolt style={styles.offerIcon} />;
                else if (offer.toLowerCase().includes("emi")) icon = <FaMoneyBillWave style={styles.offerIcon} />;
                else icon = <FaTag style={styles.offerIcon} />;
                return (
                  <li key={idx} style={styles.offerItem}>
                    {icon}
                    <span style={{ flex: 1, marginLeft: 8 }}>{offer.split("T&C")[0].trim()}</span>
                    <a href="#" style={styles.tcLink}>T&C</a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Exchange Option Box - show only for specified categories */}
          {showExchangeOptions && (
            <div style={styles.exchangeBox}>
              <label style={styles.radioLabel}>
                <input
                  type="radio"
                  name="exchangeOption"
                  value="without"
                  checked={exchangeOption === "without"}
                  onChange={() => setExchangeOption("without")}
                />
                Buy without Exchange
              </label>

              <label style={styles.radioLabel}>
                <input
                  type="radio"
                  name="exchangeOption"
                  value="with"
                  checked={exchangeOption === "with"}
                  onChange={() => setExchangeOption("with")}
                />
                Buy with Exchange
              </label>
            </div>
          )}

          {product.colors?.length > 0 && (
            <div style={styles.selectSection}>
              <div style={styles.selectHeader} onClick={() => setColorOpen(!colorOpen)}>
                <strong>Select Color</strong>
                <span>{colorOpen ? "▲" : "▼"}</span>
              </div>
              {colorOpen && (
                <div style={styles.colorGrid}>
                  {product.colors.map((color, idx) => (
                    <div
                      key={idx}
                      style={{
                        ...styles.colorCard,
                        border: selectedColor === color ? "2px solid #000" : "1px solid #ccc",
                      }}
                      onClick={() => {
                        setSelectedColor(color);
                        if (product.colorImages?.[color]) setSelectedImage(product.colorImages[color]);
                      }}
                    >
                      <img src={product.colorImages[color]} alt={color} style={styles.colorImage} />
                      <span style={styles.colorName}>{color}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {product.storageOptions?.length > 0 && (
            <div style={styles.selectSection}>
              <div style={styles.selectHeader} onClick={() => setStorageOpen(!storageOpen)}>
                <strong>Select Storage</strong>
                <span>{storageOpen ? "▲" : "▼"}</span>
              </div>
              {storageOpen && (
                <div style={styles.storageTabs}>
                  {product.storageOptions.map((size, idx) => (
                    <div
                      key={idx}
                      style={{
                        ...styles.storageTab,
                        border: selectedStorage === size ? "2px solid #000" : "1px solid transparent",
                        backgroundColor: selectedStorage === size ? "#f0f0f0" : "#fff",
                        color: "#222",
                      }}
                      onClick={() => setSelectedStorage(size)}
                    >
                      {size}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <div style={styles.iconsRow}>
            <div style={styles.iconBox}>
              <FaHeadset size={20} />
              <span>7 Day Brand Support</span>
            </div>
            <div style={styles.iconBox}>
              {[...Array(4)].map((_, i) => (
                <FaStar key={i} color="#f4b400" />
              ))}
              <FaRegStar color="#ccc" />
              <span style={{ marginLeft: 6 }}>Customer Reviews</span>
            </div>
          </div>

          <p style={styles.reviewStats}>4,619,106 Ratings & 793 Reviews</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "2rem",
    maxWidth: 1000,
    margin: "0 auto",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    fontSize: 16,
    color: "#212121",
  },
  productWrapper: { 
    display: "flex", 
    gap: "2rem", 
    flexWrap: "nowrap",
    alignItems: "flex-start",
  },
  leftColumn: {
    flex: "1 1 45%",
    display: "flex",
    flexDirection: "column",
  },
  rightColumn: {
    flex: "1 1 50%",
    fontSize: 16,
    lineHeight: 1.5,
    color: "#212121",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111",
    marginBottom: 16,
    marginTop: 20,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  imageSection: {
    marginBottom: 20,
  },
  mainImage: {
    width: "100%",
    maxWidth: 420,
    height: "auto",
    objectFit: "contain",
    marginBottom: "1.5rem",
    backgroundColor: "#000",
    borderRadius: 12,
  },
  thumbnailRow: {
    display: "flex",
    gap: "1rem",
    marginTop: 8,
    flexWrap: "nowrap",
  },
  thumbnail: {
    width: 80,
    height: 80,
    objectFit: "cover",
    cursor: "pointer",
    borderRadius: 12,
    border: "1.5px solid #ccc",
    transition: "border-color 0.3s ease",
  },
  specsContainer: {
    marginTop: 0,
    fontSize: 15,
    color: "#333",
    lineHeight: 1.5,
  },
  specsTitle: {
    fontSize: 22,
    marginBottom: "1rem",
    fontWeight: 700,
    color: "#111",
  },
  specSection: {
    marginBottom: "0.75rem",
  },
  buttonsRow: {
    display: "flex",
    gap: 20,
    marginTop: 20,
  },
  addToCartBtn: {
    padding: "14px 24px",
    backgroundColor: "#ff9f00",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 700,
    fontSize: 16,
    boxShadow: "0 4px 8px rgb(255 159 0 / 0.4)",
    transition: "background-color 0.3s ease",
    minWidth: 160,
  },
  buyNowBtn: {
    padding: "14px 24px",
    backgroundColor: "#fb641b",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 700,
    fontSize: 16,
    boxShadow: "0 4px 8px rgb(251 100 27 / 0.4)",
    transition: "background-color 0.3s ease",
    minWidth: 160,
  },
  brand: { marginBottom: 8, fontWeight: 600, fontSize: 16, color: "#333" },
  category: { marginBottom: 12, fontWeight: 500, fontSize: 15, color: "#555" },
  price: { fontSize: "24px", fontWeight: "700", marginBottom: "1.5rem", color: "#fb641b" },
  offersContainer: { marginBottom: 20 },
  offersTitle: { fontSize: 18, fontWeight: 700, marginBottom: 8, color: "#222" },
  offersList: { listStyle: "none", paddingLeft: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 },
  offerItem: {
    display: "flex",
    alignItems: "center",
    fontSize: 14,
    color: "#222",
  },
  offerIcon: { color: "#0078d7", minWidth: 18 },
  tcLink: {
    color: "#1565c0",
    fontWeight: "600",
    marginLeft: 10,
    textDecoration: "none",
    cursor: "pointer",
  },
  exchangeBox: {
    border: "1px solid #d7d7d7",
    padding: "1rem",
    borderRadius: 6,
    marginBottom: "1.5rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    fontSize: 15,
    userSelect: "none",
    color: "#222",
  },
  radioLabel: {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontWeight: 600,
  },
  selectSection: { margin: "1rem 0" },
  selectHeader: {
    display: "flex",
    justifyContent: "space-between",
    cursor: "pointer",
    padding: "0.75rem 0",
    borderBottom: "1px solid #d7d7d7",
    fontWeight: 600,
    fontSize: 16,
    color: "#222",
  },
  colorGrid: {
    display: "flex",
    gap: "1rem",
    marginTop: 12,
    flexWrap: "wrap",
  },
  colorCard: {
    width: 90,
    textAlign: "center",
    cursor: "pointer",
    padding: 6,
    borderRadius: 8,
    boxShadow: "0 1px 4px rgb(0 0 0 / 0.1)",
    transition: "border-color 0.3s ease",
  },
  colorImage: { width: "100%", height: 66, objectFit: "cover", borderRadius: 6 },
  colorName: { fontSize: 14, marginTop: 6, display: "block", color: "#333", fontWeight: 500 },
  storageTabs: { display: "flex", gap: "0.75rem", marginTop: 12 },
  storageTab: {
    padding: "8px 16px",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 15,
    fontWeight: 600,
    border: "1.5px solid transparent",
    transition: "background-color 0.3s ease, border-color 0.3s ease",
    backgroundColor: "#fff",
    color: "#222",
  },
  iconsRow: {
    marginTop: "2rem",
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  iconBox: { display: "flex", alignItems: "center", gap: 12, fontSize: 15, color: "#444" },
  reviewStats: {
    marginTop: 12,
    fontSize: 14,
    color: "#666",
    fontWeight: 500,
  },
  loading: { textAlign: "center", padding: "3rem", fontSize: "1.5rem" },
};

export default SingleProduct;
