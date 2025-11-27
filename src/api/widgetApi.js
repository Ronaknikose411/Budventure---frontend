// src/api/widgetApi.js
import api from "./axios";

const WIDGET_BASE = "/widget";

/**
 * WIDGET API — Clean, No Duplicates
 */

// 1. Get widget config (welcome message, colors, etc.)
export const getWidgetConfig = async () => {
  const res = await api.get(`${WIDGET_BASE}/config`);
  return res.data;
};

// 2. Update widget appearance (admin panel)
export const updateWidgetConfig = async (data) => {
  const res = await api.put(`${WIDGET_BASE}/config`, data);
  return res.data;
};

// 3. Create new chat session (when user opens widget)
export const createWidgetSession = async (sessionId) => {
  const res = await api.post("/chat/session/create", { sessionId });
  return res.data;
};

// 4. Send message from customer → AI
export const sendUserMessage = async (sessionId, text) => {
  const res = await api.post(`/chat/session/${sessionId}/message`, { text });
  return res.data;
};

// 5. Customer clicks "Talk to human"
export const requestHumanSupport = async (sessionId) => {
  const res = await api.post(`/chat/session/${sessionId}/human`);
  return res.data;
};

// 6. Get chat history for returning users
export const getWidgetHistory = async (sessionId) => {
  const res = await api.get(`/widget/history/${sessionId}`);
  return res.data;
};

// Optional: Get greeting/fallback (if you want separate endpoints)
export const getGreetingMessage = async () => {
  const res = await api.get("/widget/greeting");
  return res.data;
};

export const getFallbackMessage = async () => {
  const res = await api.get("/widget/fallback");
  return res.data;
};

// Export all as default object (optional, for tree-shaking)
export default {
  getWidgetConfig,
  updateWidgetConfig,
  createWidgetSession,
  sendUserMessage,
  requestHumanSupport,
  getWidgetHistory,
  getGreetingMessage,
  getFallbackMessage,
};