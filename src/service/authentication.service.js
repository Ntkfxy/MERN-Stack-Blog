// import axios instance ที่ตั้งค่า baseURL ไว้แล้ว
// เช่น baseURL = http://localhost:5000/api/v1
import api from "./api";

// อ่าน path ของ auth จากไฟล์ .env
// ตัวอย่างใน .env:
// VITE_AUTH_API=/auth
const API_URL = import.meta.env.VITE_AUTH_API;

// import service สำหรับจัดการ cookie (user / token)
import TokenService from "./token.service";

/**
 * =========================
 * 📌 สมัครสมาชิก (Register)
 * =========================
 * - ส่ง username และ password ไป backend
 * - ยังไม่เก็บ token
 * - ปล่อยให้หน้า UI จัดการผลลัพธ์เอง
 */
const register = async (username, password) => {
  console.log("API URL ", API_URL);

  // POST /auth/register
  return await api.post(API_URL + "/register", {
    username,
    password,
  });
};

/**
 * =========================
 * 📌 Login (สำคัญที่สุด)
 * =========================
 * Flow:
 * 1. ยิง API login
 * 2. backend ส่ง user + accessToken กลับมา
 * 3. เก็บ user ลง cookie
 * 4. return เฉพาะ data (ไม่ return axios response)
 */
const login = async (username, password) => {
  // ยิง API login ไปที่ backend
  const response = await api.post(API_URL + "/login", {
    username,
    password,
  });

  // ดึงเฉพาะค่าที่จำเป็นออกมา
  const { status, data } = response;

  /**
   * เช็คว่า:
   * - status = 200 (login สำเร็จ)
   * - data มี accessToken
   */
  if (status === 200 && data?.accessToken) {
    // 👉 เก็บ user ลง cookie
    // จะถูก stringify ภายใน TokenService
    TokenService.setUser(data);
  }

  /**
   * สำคัญมาก
   * return เฉพาะ data (user object)
   *  ไม่ return response
   *
   * เพราะ:
   * - UI ต้องการ user ไม่ใช่ axios response
   * - ป้องกัน context เพี้ยน
   */
  return data;
};

/**
 * =========================
 *  Logout
 * =========================
 * - ลบ cookie user
 * - ทำให้ user หลุดจากระบบ
 */
const logout = () => {
  TokenService.removeUser();
};

/**
 * =========================
 *  รวม auth functions
 * =========================
 * เพื่อให้ import ใช้ง่าย
 */
const AuthService = {
  register,
  login,
  logout,
};

// export ออกไปให้ component ใช้งาน
export default AuthService;
