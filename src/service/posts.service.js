import api from "./api";
const API_URL = import.meta.env.VITE_POST_API;

const getAllPosts = async () => {
    return await api.get(API_URL);
};
const getById = async (id) => {
    return await api.get(API_URL + "/"+id)
};
const getByAuthorId = async (id) => {
    return await api.get(`${API_URL}/auth/${id}`)
};
const createPost = async (post) => {
    return await api.get(API_URL, post)
};
const updatePost = async (id, post) => {
return await api.put(`${API_URL}/${id}`, post)
};
const daletePost = async (id) => {
    return await api.delete(`${API_URL}/${id}`);
};

const postService = {
  getAllPosts,
  getById,
  getByAuthorId,
  createPost,
  updatePost,
  daletePost,
};

export default postService;