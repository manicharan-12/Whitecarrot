import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

export const fetchEvents = async (params) => {
  const response = await api.get("/api/events", { params });
  return response.data;
};

export const login = async () => {
  window.location.href = `${process.env.REACT_APP_API_URL}/api/auth/google`;
};

export const logout = async () => {
  await api.post("/api/auth/logout");
};
