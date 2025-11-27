// src/components/ChatWindow.jsx
import React, { useEffect, useRef, useState } from "react";

const ChatWindow = ({ messages = [], onSend, onTyping, typingState }) => {
  const [text, setText] = useState("");
  const boxRef = useRef();

  useEffect(() => {
    // scroll to bottom when messages change
    if (boxRef.current) {
      boxRef.current.scrollTop = boxRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setText("");
  };

  const handleTyping = (e) => {
    setText(e.target.value);
    if (onTyping) onTyping();
  };

  return (
    <div style={{ border: "1px solid #ddd", borderRadius: 8, maxWidth: 800 }}>
      <div ref={boxRef} style={{ height: 400, overflowY: "auto", padding: 12, background: "#fafafa" }}>
        {messages.map((m, idx) => (
          <div key={idx} style={{ marginBottom: 10, display: "flex", flexDirection: "column", alignItems: m.sender === "admin" ? "flex-end" : "flex-start" }}>
            <div style={{
              maxWidth: "80%",
              background: m.sender === "admin" ? "#d1e7dd" : "#fff",
              padding: "8px 12px",
              borderRadius: 6,
              boxShadow: "0 1px 2px rgba(0,0,0,0.04)"
            }}>
              <div style={{ fontSize: 14 }}>{m.text}</div>
              <div style={{ fontSize: 11, color: "#666", marginTop: 6 }}>
                {new Date(m.timestamp || m.createdAt || Date.now()).toLocaleString()}
                {" "} • {m.sender}
              </div>
            </div>
          </div>
        ))}
        {typingState?.length > 0 && (
          <div style={{ fontStyle: "italic", color: "#666", marginTop: 6 }}>
            {typingState} typing...
          </div>
        )}
      </div>

      <form onSubmit={handleSend} style={{ display: "flex", gap: 8, padding: 12 }}>
        <input
          value={text}
          onChange={handleTyping}
          placeholder="Type a message..."
          style={{ flex: 1, padding: "8px 12px" }}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatWindow;
