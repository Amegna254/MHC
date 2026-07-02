import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const registerUser = async (userData: any) => {
  const response = await API.post("/auth/register", userData);
  return response.data;
};

export const loginUser = async (userData: any) => {
  const response = await API.post("/auth/login", userData);
  return response.data;
};

export default API;