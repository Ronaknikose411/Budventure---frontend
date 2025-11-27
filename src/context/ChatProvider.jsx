// src/context/ChatProvider.jsx
import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { getToken } from "../utils/storage";
import { ChatContext } from "./ChatContext";

export const ChatProvider = ({ children }) => {
  const socketRef = useRef(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const token = getToken();

    // THIS IS THE ONLY CHANGE — FORCED DIRECT CONNECTION TO BACKEND
    // Because Vite proxy is not working for you right now
    const socket = io("http://localhost:7000", {
      auth: token ? { token } : {},
      transports: ["websocket"],
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 10,
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("SUCCESS: Socket connected:", socket.id);
      setConnected(true);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
      setConnected(false);
    });

    socket.on("connect_error", (err) => {
      console.error("Socket connect error:", err.message);
    });

    socket.on("adminStatus", (count) => {
      console.log("Online admins:", count);
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, []);

  // YOUR EXACT SAME FUNCTIONS — NOT CHANGED AT ALL
  const joinRoom = (sessionId) => {
    socketRef.current?.emit("adminJoin", sessionId);
  };

  const sendAdminMessage = (sessionId, text) => {
    socketRef.current?.emit("adminMessage", { sessionId, text });
  };

  const onNewMessage = (cb) => {
    socketRef.current?.on("newMessage", cb);
    return () => socketRef.current?.off("newMessage", cb);
  };

  const onTyping = (cb) => {
    socketRef.current?.on("typing", cb);
    return () => socketRef.current?.off("typing", cb);
  };

  const emitTyping = (sessionId, sender = "admin") => {
    socketRef.current?.emit("typing", { sessionId, sender });
  };

  return (
    <ChatContext.Provider
      value={{
        connected,
        joinRoom,
        sendAdminMessage,
        onNewMessage,
        onTyping,
        emitTyping,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};