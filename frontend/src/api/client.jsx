import axios from "axios";

// const baseURL = import.meta.env.VITE_API_BASE_URL;
const client = axios.create({baseURL: "https://wdc-backend-1044744936985.us-central1.run.app", withCredentials: true});
export default client;
