import axios from "axios";

const api = axios.create({
  baseURL: "https://hck-2-mentorias.onrender.com/docs",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
