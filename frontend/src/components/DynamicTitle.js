import React from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

export default function DynamicTitle() {
  const location = useLocation();

  // Map routes to titles
  const titleMap = {
    "/": "Shopnix - Home",
    "/cart": "Your Cart - Shopnix",
    "/orders": "Order History - Shopnix",
    "/profile": "Your Profile - Shopnix",
    "/login": "Login - Shopnix",
    "/about": "About Us - Shopnix",
    "/careers": "Careers - Shopnix",
    "/blog": "Blog - Shopnix",
    "/contact": "Contact Us - Shopnix",
    "/faqs": "FAQs - Shopnix",
    "/shipping": "Shipping Info - Shopnix",
    "/returns": "Returns Policy - Shopnix",
    "/tracking": "Track Your Order - Shopnix",
    "/privacy": "Privacy Policy - Shopnix",
    "/terms": "Terms & Conditions - Shopnix",
    "/cookies": "Cookies Policy - Shopnix",
    "/new-arrivals": "New Arrivals - Shopnix",
    "/best-sellers": "Best Sellers - Shopnix",
  };

  // Default fallback if route not in map
  const pageTitle = titleMap[location.pathname] || "Shopnix";

  return (
    <Helmet>
      <title>{pageTitle}</title>
    </Helmet>
  );
}
