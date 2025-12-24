import axios from "axios";

export const registerStudent = (data) =>
  axios.post("http://localhost:5000/api/students/register", data);
