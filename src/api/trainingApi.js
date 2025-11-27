import api from "./axios";

// GET ALL training data
export const getTrainingData = async () => {
  const res = await api.get("/training/all");
  return res.data;
};

// ADD training
export const addTrainingData = async (payload) => {
  const res = await api.post("/training/add", payload);
  return res.data;
};

// UPDATE training
export const updateTrainingData = async (id, payload) => {
  const res = await api.put(`/training/update/${id}`, payload);
  return res.data;
};

// DELETE training
export const deleteTrainingData = async (id) => {
  const res = await api.delete(`/training/delete/${id}`);
  return res.data;
};
