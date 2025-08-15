export function sendChatMessage(message) {
    const lowerMsg = message.toLowerCase();
  
    // CATEGORIES
    if (lowerMsg.includes("categories")) {
      return {
        type: "links",
        text: "Here are some categories you can explore:",
        links: [
          { name: "Electronics", link: "/products/Electronics" },
          { name: "Clothing", link: "/products/Fashion" },
          { name: "Home & Kitchen", link: "/products/Kitchen" },
          { name: "Sports", link: "/products/Sports" }
        ]
      };
    }
  
    // ORDERS
    if (lowerMsg.includes("order")) {
      return {
        type: "links",
        text: "Here are some order-related options:",
        links: [
          { name: "My Orders", link: "/orders" },
          { name: "Track Order", link: "/tracking" },
          { name: "Order Help", link: "/contact" }
        ]
      };
    }
  
    // POLICIES
    if (lowerMsg.includes("policy") || lowerMsg.includes("policies")) {
      return {
        type: "links",
        text: "Here are our store policies:",
        links: [
            { name: "Privacy Policy", link: "/privacy" },
            { name: "Return Policy", link: "/returns" },           
          { name: "Shipping Policy", link: "/shipping" }
        ]
      };
    }
  
    // DEFAULT
    return {
      type: "text",
      text: "Sorry, I didn’t quite get that. Could you try asking about categories, orders, or policies?"
    };
  }
  