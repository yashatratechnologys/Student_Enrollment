import axios from "axios";

export const registerStudent = (data) =>
  axios.post( "https://student-enrollment-backend-8xh0.onrender.com/api/students/register",
    data);
