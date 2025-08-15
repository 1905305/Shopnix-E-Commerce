// src/components/ChatWidget.jsx
import React, { useState, useRef, useEffect } from "react";
import { sendChatMessage } from "../utils/chatbotLogic";

// Inline styles kept in JS for easy drop-in and theme tweaks
const STYLES = {
  toggleBtn: {
    position: "fixed",
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: "50%",
    background: "#ff3b3b",
    color: "#fff",
    border: "none",
    boxShadow: "0 6px 18px rgba(0,0,0,0.2)",
    fontSize: 22,
    cursor: "pointer",
    zIndex: 2000
  },
  widgetWrap: {
    position: "fixed",
    bottom: 90,
    right: 20,
    width: 320,
    height: 420,
    maxWidth: "calc(100% - 40px)",
    borderRadius: 14,
    background: "#fff",
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    zIndex: 2000
  },
  header: {
    height: 80,
    padding: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "linear-gradient(135deg,#5b8cff,#9b6bff)",
    color: "#fff"
  },
  headerTitle: { fontSize: 18, fontWeight: 700, lineHeight: 1 },
  body: { flex: 1, padding: 12, overflowY: "auto", background: "#f6f7fb" },
  messages: { display: "flex", flexDirection: "column", gap: 10 },
  bubbleBot: {
    alignSelf: "flex-start",
    maxWidth: "85%",
    background: "#fff",
    padding: "10px 12px",
    borderRadius: 12,
    boxShadow: "0 2px 6px rgba(0,0,0,0.04)"
  },
  bubbleUser: {
    alignSelf: "flex-end",
    maxWidth: "85%",
    background: "#ff3b3b",
    color: "#fff",
    padding: "10px 12px",
    borderRadius: 12
  },
  footer: { padding: 10, borderTop: "1px solid #eee", display: "flex", gap: 8 },
  input: {
    flex: 1,
    padding: "8px 12px",
    borderRadius: 20,
    border: "1px solid #ddd",
    outline: "none"
  },
  sendBtn: {
    background: "#007bff",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: 16,
    cursor: "pointer"
  },
  quickBtn: {
    padding: "8px 10px",
    borderRadius: 12,
    border: "none",
    background: "#fff",
    boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
    cursor: "pointer"
  },
  linkItem: {
    display: "inline-block",
    padding: "6px 8px",
    margin: "6px 6px 0 0",
    background: "#fff",
    borderRadius: 10,
    border: "1px solid #eee",
    cursor: "pointer"
  }
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! 👋 I'm Shopnix Assistant. Ask me about categories, orders, or policies." }
  ]);
  const [input, setInput] = useState("");
  const [showTyping, setShowTyping] = useState(false);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages, open]);

  function addMessage(msg) {
    setMessages(prev => [...prev, msg]);
  }

  function handleUserSend(text) {
    if (!text.trim()) return;
    addMessage({ from: "user", text });
    setInput("");
    setShowTyping(true);

    setTimeout(() => {
      const reply = sendChatMessage(text);

      // Normalize to array
      const repliesArray = Array.isArray(reply) ? reply : [reply];

      repliesArray.forEach(r => {
        if (!r) return;
        if (r.type === "text") {
          addMessage({ from: "bot", text: r.text });
        }
        if (r.type === "links") {
          addMessage({ from: "bot", text: r.text, links: r.links });
        }
        if (r.type === "quick") {
          addMessage({ from: "bot", text: r.text, quick: r.quick });
        }
        if (r.type === "options") {
          addMessage({ from: "bot", text: r.text, options: r.options });
        }
      });

      setShowTyping(false);
    }, 500);
  }

  function handleQuickClick(q) {
    handleUserSend(q);
  }

  function handleRedirect(link) {
    setOpen(false);
    window.location.href = link;
  }

  return (
    <>
      {!open && (
        <button
          aria-label="Open chat"
          style={STYLES.toggleBtn}
          onClick={() => setOpen(true)}
        >
          💬
        </button>
      )}

      {open && (
        <div style={STYLES.widgetWrap}>
          <div style={STYLES.header}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 42, height: 42, borderRadius: 10, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#4a4a4a" }}>
                SN
              </div>
              <div>
                <div style={STYLES.headerTitle}>Shopnix Assistant</div>
                <div style={{ fontSize: 12, opacity: 0.95 }}>How can we help you today?</div>
              </div>
            </div>
            <button
              title="Minimize"
              onClick={() => setOpen(false)}
              style={{ background: "transparent", border: "none", color: "#fff", cursor: "pointer", fontSize: 20 }}
            >
              _
            </button>
          </div>

          <div style={STYLES.body} ref={bodyRef}>
            <div style={STYLES.messages}>
              {messages.map((m, i) => (
                <div key={i} style={m.from === "bot" ? STYLES.bubbleBot : STYLES.bubbleUser}>
                  {m.text && <div style={{ whiteSpace: "pre-wrap" }}>{m.text}</div>}

                  {m.links && (
                    <div style={{ marginTop: 8 }}>
                      {m.links.map((l, idx) => (
                        <div
                          key={idx}
                          style={STYLES.linkItem}
                          onClick={() => handleRedirect(l.link)}
                        >
                          {l.name}
                        </div>
                      ))}
                    </div>
                  )}

                  {m.quick && (
                    <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {m.quick.map((q, idx) => (
                        <button key={idx} style={STYLES.quickBtn} onClick={() => handleQuickClick(q)}>
                          {q}
                        </button>
                      ))}
                    </div>
                  )}

                  {m.options && (
                    <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {m.options.map((opt, idx) => (
                        <button
                          key={idx}
                          style={STYLES.quickBtn}
                          onClick={() => handleRedirect(opt.link)}
                        >
                          {opt.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {showTyping && (
                <div style={STYLES.bubbleBot}>
                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#cfcfcf", animation: "blink 1s infinite" }} />
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#cfcfcf", animation: "blink 1.1s infinite 0.2s" }} />
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#cfcfcf", animation: "blink 1.2s infinite 0.4s" }} />
                    <style>{`@keyframes blink { 0% {opacity:0.2} 50%{opacity:1} 100%{opacity:0.2}}`}</style>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div style={STYLES.footer}>
            <input
              placeholder="Type your message..."
              style={STYLES.input}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleUserSend(input);
              }}
            />
            <button style={STYLES.sendBtn} onClick={() => handleUserSend(input)}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}
