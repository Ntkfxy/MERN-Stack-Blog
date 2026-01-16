import { useState } from "react";
import { UserContext } from "./UserContext";
import TokenService from "../service/token.service";

export const UserContextProvider = ({ children }) => {
  /**
   * 📌 userInfo
   * - เก็บข้อมูล user ที่ login อยู่
   * - ตอนเปิดเว็บใหม่ → ดึงจาก cookie มาก่อน
   */
  const [userInfo, setUserInfo] = useState(TokenService.getUser());

  /**
   * 📌 login
   * - เก็บ user ลง state
   * - บันทึกลง cookie
   */
  const logIn = (user) => {
    setUserInfo(user);
    TokenService.setUser(user);
  };

  /**
   * 📌 logout
   * - ล้าง state
   * - ลบ cookie
   */
  const logOut = () => {
    setUserInfo(null);
    TokenService.removeUser();
  };

  return (
    <UserContext.Provider value={{ userInfo, logIn, logOut }}>
      {children}
    </UserContext.Provider>
  );
};
