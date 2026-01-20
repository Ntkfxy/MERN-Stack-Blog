import { Cookies } from "react-cookie";

// =========================
// 📦 สร้าง instance cookie
// =========================
const cookies = new Cookies();

/**
 * =========================
 * 📌 อ่านข้อมูล user จาก cookie
 * =========================
 * - cookie เก็บเป็น string
 * - ต้อง JSON.parse ก่อนใช้งาน
 * - ถ้า parse พัง → ลบ cookie ทิ้ง
 */
const getUser = () => {
  const user = cookies.get("user");
  return user;
};
/**
 * =========================
 * 📌 ดึง accessToken
 * =========================
 * - ใช้แนบ Authorization header
 * - ถ้าไม่มี → return string ว่าง
 */
const getAccessToken = () => {
  const user = getUser();
  return user?.accessToken || "";
};

/**
 * =========================
 * 📌 บันทึก user ลง cookie
 * =========================
 * - เรียกหลัง login สำเร็จ
 * - เก็บเฉพาะข้อมูลจำเป็น
 * - อายุ cookie 1 วัน
 */
const setUser = (user) => {
  if (!user) return removeUser();

  cookies.set(
    "user",
    JSON.stringify({
      id: user.id || user._id,
      username: user.username,
      accessToken: user.accessToken,
    }),
    {
      path: "/",
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    }
  );
};

/**
 * =========================
 * 📌 ลบ user ออกจาก cookie
 * =========================
 * - เรียกตอน logout
 */
const removeUser = () => {
  cookies.remove("user", { path: "/" });
};

// =========================
// 📦 export service
// =========================
export default {
  getUser,
  getAccessToken,
  setUser,
  removeUser,
};
