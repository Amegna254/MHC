import axios from "axios";

const API = "http://localhost:5000/api/users";

const getToken = () => localStorage.getItem("token");

export const getProfile = async () => {
  const response = await axios.get(`${API}/me`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

export const updateProfile = async (user: {
  fullName: string;
  username: string;
  email: string;
}) => {
  const response = await axios.put(`${API}/me`, user, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

export const changePassword = async (passwords: {
  currentPassword: string;
  newPassword: string;
}) => {
  const response = await axios.put(
    `${API}/password`,
    passwords,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return response.data;
};
export const uploadAvatar = async (formData: FormData) => {
  const token = localStorage.getItem("token");

  const response = await axios.put(
    `${API}/avatar`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};