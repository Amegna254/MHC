import axios from "axios";

const API = "http://localhost:5000/api/media";

export const uploadMedia = async (
  formData: FormData,
  onProgress?: (progress: number) => void
) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    `${API}/upload`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },

      onUploadProgress: (event) => {
        if (event.total && onProgress) {
          const progress = Math.round(
            (event.loaded * 100) / event.total
          );

          onProgress(progress);
        }
      },
    }
  );

  return response.data;
};

export const getMedia = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${API}/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getPublicMedia = async () => {
  const response = await axios.get(API);
  return response.data;
};

export const getListingById = async (id: number | string) => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${API}/${id}`, {
    headers: token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : undefined,
  });
  return response.data;
};

export const incrementView = async (id: number | string) => {
  const response = await axios.post(`${API}/${id}/view`);
  return response.data;
};

export const likeItem = async (id: number | string) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    `${API}/${id}/like`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const addComment = async (id: number | string, content: string) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    `${API}/${id}/comment`,
    { content },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};