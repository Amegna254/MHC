import axios from "axios";

const API = "http://localhost:5000/api/media";

/* ==========================
   Upload Media
========================== */

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

/* ==========================
   Current User Media
========================== */

export const getMedia = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${API}/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

/* ==========================
   Public Gallery
========================== */

export const getPublicMedia = async () => {
  const response = await axios.get(API);
  return response.data;
};

/* ==========================
   Single Media Details
========================== */

export const getMediaById = async (
  id: number | string
) => {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    `${API}/${id}`,
    {
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : undefined,
    }
  );

  return response.data;
};

/* ==========================
   Marketplace Listing Details
========================== */

export const getListingById = async (
  id: number | string
) => {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    `http://localhost:5000/api/listings/${id}`,
    {
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : undefined,
    }
  );

  return response.data;
};
/* ==========================
   Views
========================== */

export const incrementView = async (
  id: number | string
) => {
  const response = await axios.post(
    `${API}/${id}/view`
  );

  return response.data;
};

/* ==========================
   Likes
========================== */

export const likeItem = async (
  id: number | string
) => {
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

/* ==========================
   Comments
========================== */

export const addComment = async (
  id: number | string,
  content: string
) => {
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

/* ==========================
   Update Media
========================== */

export const updateMedia = async (
  id: number | string,
  data: any
) => {
  const token = localStorage.getItem("token");

  const response = await axios.put(
    `${API}/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

/* ==========================
   Delete Media
========================== */

export const deleteMedia = async (
  id: number | string
) => {
  const token = localStorage.getItem("token");

  const response = await axios.delete(
    `${API}/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const createOrder = async (
  listingId: number | string
) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    "http://localhost:5000/api/orders",
    {
      listingId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
export const getMyOrders = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    "http://localhost:5000/api/orders/my-orders",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};