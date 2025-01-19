import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

export const fetchEvents = async (params) => {
  try {
    const response = await api.get("/api/events", { params });
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
};

export const login = async () => {
  window.location.href = `${process.env.REACT_APP_API_URL}/api/auth/google`;
};

export const logout = async () => {
  await api.post("/api/auth/logout");
};

export const checkAuth = async () => {
  const response = await api.get("/api/auth/check");
  return response.data;
};
