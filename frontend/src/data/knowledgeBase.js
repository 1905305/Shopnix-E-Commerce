// src/data/knowledgeBase.js
const knowledgeBase = {
    company: [
      { name: "About", link: "/about" },
      { name: "Careers", link: "/careers" },
      { name: "Blog", link: "/blog" },
      { name: "Contact", link: "/contact" }
    ],
    help: [
      { name: "FAQs", link: "/faqs" },
      { name: "Shipping", link: "/shipping" },
      { name: "Returns", link: "/returns" },
      { name: "Tracking", link: "/tracking" }
    ],
    legal: [
      { name: "Privacy", link: "/privacy" },
      { name: "Terms", link: "/terms" },
      { name: "Cookies", link: "/cookies" }
    ],
    shop: [
      { name: "All", link: "/shop" },
      { name: "New Arrivals", link: "/shop/new" },
      { name: "Best Sellers", link: "/shop/best-sellers" },
      { name: "Follow Us", link: "/follow" }
    ],
    categories: [
      { name: "Sports", link: "/category/sports" },
      { name: "Stationery", link: "/category/stationery" },
      { name: "Fashion", link: "/category/fashion" },
      { name: "Books", link: "/category/books" },
      { name: "Kitchen", link: "/category/kitchen" },
      { name: "Appliances", link: "/category/appliances" },
      { name: "Grocery", link: "/category/grocery" },
      { name: "Mobiles", link: "/category/mobiles" },
      { name: "Toys", link: "/category/toys" },
      { name: "Beauty", link: "/category/beauty" },
      { name: "Bathroom", link: "/category/bathroom" },
      { name: "Laptops", link: "/category/laptops" },
      { name: "Electronics", link: "/category/electronics" },
      { name: "Home", link: "/category/home" }
    ],
    banners: [
      "Curated Picks by Shopnix — Tailored to Inspire",
      "Shopnix — Personal Project. Built by Anish Xalxo"
    ],
    testimonials: [
      { name: "Rohit Verma", role: "Fitness Trainer", text: "The sports collection is perfect for my daily routine. Durable and stylish." },
      { name: "Anjali Mehta", role: "Entrepreneur", text: "From workwear to casual, Shopnix has it all. Highly recommend to my network!" }
    ],
    policies: {
      returns: "Easy returns within 30 days of purchase with full refund or exchange.",
      shipping: "We offer fast and reliable shipping with tracking available for all orders.",
      tracking: "Track your order status in your account dashboard or via the tracking link emailed to you."
    }
  };
  
  export default knowledgeBase;
  