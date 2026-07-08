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
export const changePassword = async (data: {
  currentPassword: string;
  newPassword: string;
}) => {
  const token = localStorage.getItem("token");

  const response = await axios.put(
    `${API_URL}/auth/change-password`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};