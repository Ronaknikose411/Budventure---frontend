import api from "./axios";

// GET waiting chat requests
export const getWaitingChats = async () => {
  const res = await api.get("/admin-chat/waiting");
  return res.data;
};

// Accept chat request
export const acceptChat = async (sessionId) => {
  const res = await api.post(`/admin-chat/accept/${sessionId}`);
  return res.data;
};

export const getActiveChat = async (sessionId) => {
  const res = await api.get(`/admin-chat/active/${sessionId}`);
  return res.data;
};

export const closeChat = async (sessionId) => {
  const res = await api.post(`/admin-chat/close/${sessionId}`);
  return res.data;
};