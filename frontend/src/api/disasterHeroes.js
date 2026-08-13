import axios from "axios";

const BASE = import.meta.env.VITE_ROSTER_API_URL || "https://wdc-roster-backend-382117221028.us-central1.run.app";

const client = axios.create({ baseURL: BASE, withCredentials: true, timeout: 20000 });

client.interceptors.request.use(cfg => {
  const token = localStorage.getItem("dh_jwt");
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

client.interceptors.response.use(
  res => { if (res.data?.token) localStorage.setItem("dh_jwt", res.data.token); return res; },
  err => Promise.reject(err)
);

export function clearHeroToken() { localStorage.removeItem("dh_jwt"); }

// Member
export const applyDisasterHero = (formData) =>
  client.post("/api/disaster-heroes/register", formData, { headers: { "Content-Type": "multipart/form-data" } });

export const loginDisasterHero = (email, password) =>
  client.post("/api/disaster-heroes/login", { email, password });

export const logoutDisasterHero = () => {
  clearHeroToken();
  return client.post("/api/disaster-heroes/logout");
};

export const getMyHeroProfile = () => client.get("/api/disaster-heroes/me");

export const forgotHeroPassword = (email) =>
  client.post("/api/disaster-heroes/forgot-password", { email });

export const resetHeroPassword = (token, password) =>
  client.post("/api/disaster-heroes/reset-password", { token, password });

// Admin (uses roster admin jwt_admin cookie)
export const adminGetHeroes = (params = {}) =>
  client.get("/api/disaster-heroes/admin/heroes", { params });

export const adminUpdateHeroStatus = (id, status) =>
  client.patch(`/api/disaster-heroes/admin/heroes/${id}/status`, { status });

// Reuse existing roster admin login endpoint
export const adminLoginForHeroes = (email, password) =>
  client.post("/api/roster/admin/login", { email, password });
