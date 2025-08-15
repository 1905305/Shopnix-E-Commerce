export const sendChatMessage = async (message) => {
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to send message");
      }
  
      const data = await response.json();
      return data.replies || [];
    } catch (error) {
      console.error("Chat service error:", error);
      return ["Sorry, something went wrong."];
    }
  };
  