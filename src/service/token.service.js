import { Cookies } from "react-cookie";

// สร้าง instance สำหรับจัดการ cookie
const cookie = new Cookies();

/**
 * 📌 อ่านข้อมูล user จาก cookie
 * - cookie จะเก็บเป็น string
 * - ต้อง parse JSON ก่อนใช้งาน
 */
const getUser = () => {
  const user = cookie.get("user");

  if (!user) return null;

  try {
    // ⭐ decode + parse ให้เป็น object จริง
    const decoded = decodeURIComponent(user);
    return JSON.parse(decoded);
  } catch (err) {
    console.error("Cannot parse user cookie", err);
    return null;
  }
};


/**
 * 📌 ดึง accessToken จาก user
 * ใช้สำหรับแนบไปกับ API request
 */
const getAccessToken = () => {
  const user = getUser();
  return user?.accessToken;
};

/**
 * 📌 บันทึกข้อมูล user ลง cookie
 * - เรียกตอน login สำเร็จ
 */
const setUser = (user) => {
  // ถ้าไม่มี user → ลบ cookie
  if (!user) return removeUser();

  cookie.set(
    "user",
    JSON.stringify({
      id: user.id,
      username: user.username,
      accessToken: user.accessToken,
    }),
    {
      path: "/", // ใช้ได้ทุกหน้า
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // หมดอายุใน 1 วัน
    }
  );
};

/**
 * 📌 ลบข้อมูล user ออกจาก cookie
 * - เรียกตอน logout
 */
const removeUser = () => {
  cookie.remove("user", { path: "/" });
};

// export รวมเป็น service
export default {
  getUser,
  getAccessToken,
  setUser,
  removeUser,
};
