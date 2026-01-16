import api from "./api";

const API_URL = import.meta.env.VITE_POST_API; // "/post"

// GET ALL
const getAllPosts = async () => {
  return await api.get(API_URL);
};

// GET BY ID
const getById = async (id) => {
  return await api.get(`${API_URL}/${id}`);
};

// GET BY AUTHOR ID ✅
const getByAuthorId = async (id) => {
  return await api.get(`${API_URL}/author/${id}`);
};

// CREATE POST (multipart/form-data) ✅
const createPost = async (post) => {
  return await api.post(API_URL + "/create", post, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// UPDATE
const updatePost = async (id, post) => {
  return await api.put(`${API_URL}/${id}`, post);
};

// DELETE
const deletePost = async (id) => {
  return await api.delete(`${API_URL}/${id}`);
};

const postService = {
  getAllPosts,
  getById,
  getByAuthorId,
  createPost,
  updatePost,
  deletePost,
};

export default postService;
