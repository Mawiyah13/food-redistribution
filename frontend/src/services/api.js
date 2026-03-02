import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({ baseURL: BASE_URL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const register = (data) => api.post("/auth/register", data);
export const login = (data) => api.post("/auth/login", data);

export const addDonation = (data) => api.post("/donations", data);
export const getDonations = (params) => api.get("/donations", { params });
export const getMyDonations = (params) => api.get("/donations/mine", { params });


export const addRequest = (data) => api.post("/requests", data);
export const getRequests = (params) => api.get("/requests", { params });
export const getMyRequests = (params) => api.get("/requests/mine", { params });


export const getMatches = (params) => api.get("/matches", { params });
export const createMatches = () => api.post("/matches");
export const completeMatch = (id) => api.patch(`/matches/${id}/complete`);
export const cancelMatch = (id) => api.patch(`/matches/${id}/cancel`);
export const getMatchNotifications = () => api.get("/matches/notifications");


export const getDashboard = () => api.get("/dashboard");

export default api;