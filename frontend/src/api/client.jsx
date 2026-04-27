import axios from "axios";

const client = axios.create({baseURL: import.meta.env.VITE_API_BASE_URL || "https://wdc-backend-1044744936985.us-central1.run.app", withCredentials: true});
export default client;
