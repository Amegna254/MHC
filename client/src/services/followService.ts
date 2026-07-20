import axios from "axios";

const API_URL = "http://localhost:5000/api/follows";

const getToken = () => localStorage.getItem("token");

export const getFollowStatus = async (creatorId: number) => {
  const response = await axios.get(`${API_URL}/${creatorId}/status`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

export const followCreator = async (creatorId: number) => {
  const response = await axios.post(
    `${API_URL}/${creatorId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return response.data;
};

export const unfollowCreator = async (creatorId: number) => {
  const response = await axios.delete(`${API_URL}/${creatorId}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};