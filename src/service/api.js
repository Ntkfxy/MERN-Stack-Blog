import axios from "axios";
import TokenService from "./token.service";
const baseURL = import.meta.env.VITE_BASE_URL;
console.log(baseURL);

//ใช้ design pattern ชื่อ singleton
const instance = axios.create({
  baseURL,
});

// Add interceptor to request object
//ส่งมาแล้วแต่ดักขาไป request
instance.interceptors.request.use((config) => {
  // Get the token and check if it exists
  const token = TokenService.getAccessToken();
  if (token) {
    // Encode the token before setting the header to handle special characters
    //ดักก่อนว่ามีไหม
    config.headers["x-access-token"] = token;
  }
  return config;
});

export default instance;
