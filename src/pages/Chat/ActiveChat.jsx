// src/pages/Chat/ActiveChat.jsx
import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ChatWindow from "../../components/ChatWindow";
import { getActiveChat, closeChat } from "../../api/chatApi";
import { useChat } from "../../context/useChat";

const ActiveChat = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const { joinRoom, sendAdminMessage, onNewMessage, onTyping, emitTyping } = useChat();

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [typingState, setTypingState] = useState("");

  const loadSession = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getActiveChat(sessionId);
      setMessages(res.messages || []);
    } catch {
      alert("Failed to load chat");
      navigate("/chat/waiting");
    } finally {
      setLoading(false);
    }
  }, [sessionId, navigate]);

  useEffect(() => {
    loadSession();
    joinRoom(sessionId);

    const unsubscribeMessages = onNewMessage((msg) => {
      if (msg) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    const unsubscribeTyping = onTyping(({ sender }) => {
      if (sender !== "admin") {
        setTypingState("User is typing...");
        const timer = setTimeout(() => setTypingState(""), 2000);
        return () => clearTimeout(timer);
      }
    });

    return () => {
      unsubscribeMessages();
      unsubscribeTyping();
    };
  }, [sessionId, joinRoom, onNewMessage, onTyping, loadSession]);

  const handleSend = (text) => {
    if (!text.trim()) return;

    const optimisticMsg = {
      sender: "admin",
      text,
      timestamp: new Date().toISOString(),
    };

    // FIXED: use the correct variable name
    setMessages((prev) => [...prev, optimisticMsg]);

    sendAdminMessage(sessionId, text);
  };

  const handleTyping = () => {
    emitTyping(sessionId, "admin");
  };

  const handleClose = async () => {
    if (!confirm("Close this chat?")) return;

    try {
      await closeChat(sessionId);
      navigate("/chat/waiting");
    } catch {
      alert("Failed to close chat");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">
          Chat with User
        </h2>
        <div className="space-x-4">
          <button
            onClick={() => navigate("/chat/waiting")}
            className="px-6 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition"
          >
            Back
          </button>
          <button
            onClick={handleClose}
            className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
          >
            Close Chat
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-500 text-xl">Loading chat...</div>
      ) : (
        <ChatWindow
          messages={messages}
          onSend={handleSend}
          onTyping={handleTyping}
          typingState={typingState}
        />
      )}
    </div>
  );
};

export default ActiveChat;