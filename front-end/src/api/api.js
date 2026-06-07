import axios from "axios";

const api = axios.create({
  baseURL: "https://riding-school-app-production.up.railway.app",
});

export default api;