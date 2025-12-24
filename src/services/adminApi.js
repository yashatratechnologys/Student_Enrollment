import axios from "axios";

const API = axios.create({
  baseURL: "https://student-enrollment-backend-8xh0.onrender.com/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const fetchStudents = (params) =>
  API.get("/students", { params });

export const exportStudents = (params) =>
  API.get("/students/export", {
    params,
    responseType: "blob",
  });
