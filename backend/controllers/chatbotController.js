import { processUserMessage } from "../services/chatbotService.js";

export const handleChatQuery = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    let botReplies = await processUserMessage(message);

    // Ensure replies is always an array
    if (!Array.isArray(botReplies)) {
      botReplies = [botReplies];
    }

    // Add clickable quick replies for certain keywords
    if (/categories/i.test(message)) {
      botReplies.push({
        type: "options",
        text: "Here are our categories:",
        options: [
          { label: "Electronics", value: "electronics" },
          { label: "Fashion", value: "fashion" },
          { label: "Home", value: "home" }
        ]
      });
    }

    if (/orders?/i.test(message)) {
      botReplies.push({
        type: "options",
        text: "Order help options:",
        options: [
          { label: "Track Order", value: "track-order" },
          { label: "Cancel Order", value: "cancel-order" },
          { label: "Order History", value: "order-history" }
        ]
      });
    }

    if (/polic(y|ies)/i.test(message)) {
      botReplies.push({
        type: "options",
        text: "Our store policies:",
        options: [
          { label: "Return Policy", value: "return-policy" },
          { label: "Shipping Policy", value: "shipping-policy" },
          { label: "Privacy Policy", value: "privacy-policy" }
        ]
      });
    }

    res.json({ replies: botReplies });

  } catch (error) {
    console.error("Error in handleChatQuery:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
