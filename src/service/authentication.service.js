import api from "./api";
const API_URL = import.meta.env.VITE_AUTH_API;
import TokenService from "./token.service";
console.log(API_URL);

const register = async (username, password) => {
  return await api.post(API_URL + "/register", {
    username,
    password,
  });
};

const login = async (username, password) => {
  const response = await api.post(API_URL + "/login", { username, password });
  const { status, data } = response;
  if (status === 200) {
    if (data?.accessToken) {
      TokenService.setUser(data);
    }
  }
  return response;
};

const logout = () => {
  TokenService.removeUser();
};

const AuthService = {
  register,
  login,
  logout,
};

export default AuthService;
