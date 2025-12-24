import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// 🔹 Fetch with filters
export const fetchStudents = (params) =>
  API.get("/students", { params });

export const exportStudents = (params) =>
  API.get("/students/export", {
    params,
    responseType: "blob", // IMPORTANT
  });
