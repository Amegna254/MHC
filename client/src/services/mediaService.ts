import axios from "axios";

const API = "http://localhost:5000/api/media";

export const uploadMedia = async (formData: FormData) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(`${API}/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getMedia = async () => {
  const response = await axios.get(API);
  return response.data;
};