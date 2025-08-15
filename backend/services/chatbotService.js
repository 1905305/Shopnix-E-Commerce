// Simulated e-commerce knowledge base
const knowledgeBase = {
    company: {
      "about": "/about",
      "careers": "/careers",
      "blog": "/blog",
      "contact": "/contact",
      "help": "/help",
      "faqs": "/faqs",
      "shipping": "/shipping",
      "returns": "/returns",
      "tracking": "/tracking",
      "privacy": "/privacy",
      "terms": "/terms",
      "cookies": "/cookies"
    },
    categories: {
      "sports": "/products/sports",
      "stationery": "/products/stationery",
      "fashion": "/products/fashion",
      "books": "/products/books",
      "kitchen": "/products/kitchen",
      "appliances": "/products/appliances",
      "grocery": "/products/grocery",
      "mobiles": "/products/mobiles",
      "toys": "/products/toys",
      "beauty": "/products/beauty",
      "bathroom": "/products/bathroom",
      "laptops": "/products/laptops",
      "electronics": "/products/electronics",
      "home": "/products/home"
    }
  };
  
  export const processUserMessage = async (message) => {
    const lowerMsg = message.toLowerCase().trim();
  
    // 1. Check company pages
    for (const [key, url] of Object.entries(knowledgeBase.company)) {
      if (lowerMsg.includes(key)) {
        return { type: "redirect", url, message: `Redirecting you to ${key} page.` };
      }
    }
  
    // 2. Check categories
    for (const [key, url] of Object.entries(knowledgeBase.categories)) {
      if (lowerMsg.includes(key)) {
        return { type: "redirect", url, message: `Showing products in ${key}` };
      }
    }
  
    // 3. Shop all, new arrivals, best sellers
    if (lowerMsg.includes("shop all") || lowerMsg.includes("all products")) {
      return { type: "redirect", url: "/shop", message: "Browsing all products." };
    }
    if (lowerMsg.includes("new arrivals")) {
      return { type: "redirect", url: "/new-arrivals", message: "Browsing new arrivals." };
    }
    if (lowerMsg.includes("best sellers")) {
      return { type: "redirect", url: "/best-sellers", message: "Browsing best sellers." };
    }
  
    // 4. Fallback
    return { type: "text", message: "Sorry, I didn’t quite get that. Could you try again?" };
  };
  