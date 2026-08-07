import axios from "axios";

const API = "http://localhost:5000/api/media";

/* ==========================
   User Library
========================== */

export const getLibrary = async (params?: {
  search?: string;
  type?: string;
  sort?: string;
}) => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${API}/user`, {
    params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};