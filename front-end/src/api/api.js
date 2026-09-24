
import axios from "axios";

const api = axios.create({
  baseURL: "https://riding-school-backend.onrender.com/api"
});

export default api;