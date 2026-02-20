import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({ baseURL: BASE_URL });

export const addDonation = (data) => api.post("/donations", data);
export const getDonations = () => api.get("/donations");

export const addRequest = (data) => api.post("/requests", data);
export const getRequests = () => api.get("/requests");

export const getMatches = () => api.get("/match");