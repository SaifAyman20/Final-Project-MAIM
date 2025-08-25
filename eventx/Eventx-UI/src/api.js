import axios from "axios";

// هنا بتحط لينك السيرفر بتاعك
const API = axios.create({
  baseURL: "http://localhost:5000/api", // غيّر ده لو السيرفر شغال على لينك تاني
});

// لو فيه توكن متخزن في localStorage ضيفه في كل ريكويست
API.interceptors.request.use((req) => {
  const user = localStorage.getItem("user");
  if (user) {
    req.headers.Authorization = `Bearer ${JSON.parse(user).token}`;
  }
  return req;
});

export default API;
