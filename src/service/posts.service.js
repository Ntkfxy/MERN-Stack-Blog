import api from "./api";
const API_URL = import.meta.env.VITE_POST_API;
console.log(API_URL);

const getAllPosts = async () => {
  return await api.get(API_URL);
};
const getById = async (id) => {
  return await api.get(API_URL + "/" + id);
};
const getByAuthorId = async (id) => {
  return await api.get(`${API_URL}/auth/${id}`);
};
const createPost = async (posts) => {
  return await api.post(API_URL, posts);
};
const updatePost = async (id, posts) => {
  return await api.put(`${API_URL}/${id}`, posts);
};
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
