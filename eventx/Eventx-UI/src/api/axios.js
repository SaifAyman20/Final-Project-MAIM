import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // غيّر ده لو الباك اند على رابط مختلف
});

export default api;
