import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/auth",
});

export const loginUser = async (data: any) => {
  const response = await API.post("/login", data);
  return response.data;
};

export const registerUser = async (data: any) => {
  const response = await API.post("/register", data);
  return response.data;
};