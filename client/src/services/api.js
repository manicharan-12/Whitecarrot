import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = getCookie("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const getCookie = (name) => {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? match[2] : null;
};

const setCookie = (name, value) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};path=/;expires=${expires.toUTCString()}`;
};

const deleteCookie = (name) => {
  document.cookie = `${name}=;path=/;expires=Thu, 01 Jan 1970 00:00:00 UTC`;
};

export const fetchEvents = async (params) => {
  try {
    const response = await api.get("/api/events", { params });
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    if (error.response?.status === 401) {
      deleteCookie("token");
      redirectTo("/login");
    }
    return [];
  }
};

const redirectTo = (path) => {
  const anchor = document.createElement("a");
  anchor.href = path;
  anchor.click();
};

export const login = () => {
  redirectTo(`${process.env.REACT_APP_API_URL}/api/auth/google`);
};

export const handleAuthCallback = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");

  if (token) {
    setCookie("token", token);
    window.history.replaceState({}, document.title, window.location.pathname);
    return true;
  }
  return false;
};

export const logout = () => {
  deleteCookie("token");
  redirectTo("/login");
};

export const checkAuth = async () => {
  try {
    const response = await api.get("/api/auth/check");
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      deleteCookie("token");
    }
    throw error;
  }
};

export const isAuthenticated = () => {
  return !!getCookie("token");
};

export const initializeAuth = () => {
  if (window.location.search.includes("token")) {
    return handleAuthCallback();
  }
  return false;
};
