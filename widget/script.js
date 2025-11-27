// widget/script.js
/* global io */
const API_BASE = "http://localhost:7000/api";
const SOCKET_URL = "http://localhost:7000";

let socket;
let sessionId = localStorage.getItem("chatSessionId") || "user_" + Date.now();
localStorage.setItem("chatSessionId", sessionId);

const toggleBtn = document.getElementById("chat-toggle");
const widget = document.getElementById("chat-widget");
const messagesDiv = document.getElementById("messages");
const input = document.getElementById("message-input");
const sendBtn = document.getElementById("send-btn");
const humanBtn = document.getElementById("human-btn");
const typing = document.getElementById("typing");
const minimizeBtn = document.getElementById("minimize-btn");

// Toggle widget
toggleBtn.onclick = () => widget.classList.toggle("hidden");
minimizeBtn.onclick = () => widget.classList.add("hidden");

// Create session
async function createSession() {
  try {
    await fetch(`${API_BASE}/chat/session/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId }),
    });
    loadHistory();
  } catch {
    console.error("Session create failed");
  }
}

// Load chat history
async function loadHistory() {
  try {
    const res = await fetch(`${API_BASE}/widget/history/${sessionId}`);
    const history = await res.json();
    history.forEach(addMessage);
  } catch {
    console.error("History load failed");
  }
}

// Add message to UI
function addMessage(msg) {
  const div = document.createElement("div");
  div.className = `max-w-xs px-5 py-3 rounded-2xl shadow-md ${
    msg.sender === "user"
      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white ml-auto"
      : "bg-gray-200 text-gray-800 mr-auto"
  }`;
  div.textContent = msg.text;
  messagesDiv.appendChild(div);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Send message
async function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  addMessage({ sender: "user", text });
  input.value = "";

  try {
    const res = await fetch(`${API_BASE}/chat/session/${sessionId}/message`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const data = await res.json();
    if (data.sender === "ai") addMessage(data);
  } catch {
    addMessage({ sender: "ai", text: "Error sending message" });
  }
}

// Request human
async function requestHuman() {
  try {
    await fetch(`${API_BASE}/chat/session/${sessionId}/human`, { method: "POST" });
    addMessage({ sender: "ai", text: "Connecting you to a human agent..." });
  } catch {
    alert("Failed to request human support");
  }
}

// Socket.IO real-time
function initSocket() {
  // io is loaded from CDN → available globally
  socket = io(SOCKET_URL, { transports: ["websocket"] });

  socket.on("connect", () => {
    console.log("Widget connected:", socket.id);
    socket.emit("joinRoom", sessionId);
  });

  socket.on("newMessage", (msg) => {
    if (msg.sender !== "user") addMessage(msg);
  });

  socket.on("typing", ({ sender }) => {
    if (sender === "admin") {
      typing.classList.remove("hidden");
      setTimeout(() => typing.classList.add("hidden"), 3000);
    }
  });
}

// Events
sendBtn.onclick = sendMessage;
input.onkeypress = (e) => e.key === "Enter" && sendMessage();
humanBtn.onclick = requestHuman;

// Start
createSession();
initSocket();