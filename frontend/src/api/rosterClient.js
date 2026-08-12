import axios from "axios";

const rosterClient = axios.create({
  baseURL: import.meta.env.VITE_ROSTER_API_URL || "https://wdc-roster-backend-382117221028.us-central1.run.app",
  withCredentials: true,
  timeout: 15000,
});

// Attach stored JWT as Authorization header on every request
rosterClient.interceptors.request.use(config => {
  const token = localStorage.getItem("roster_jwt");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Store token when returned in response body (login/register)
rosterClient.interceptors.response.use(
  res => {
    if (res.data?.token) localStorage.setItem("roster_jwt", res.data.token);
    return res;
  },
  error => Promise.reject(error)
);

export function clearRosterToken() {
  localStorage.removeItem("roster_jwt");
}

export default rosterClient;
