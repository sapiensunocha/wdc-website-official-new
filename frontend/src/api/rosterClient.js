import axios from "axios";

const rosterClient = axios.create({
  baseURL: import.meta.env.VITE_ROSTER_API_URL || "https://wdc-roster-backend-382117221028.us-central1.run.app",
  withCredentials: true,
  timeout: 15000,
});

export default rosterClient;
