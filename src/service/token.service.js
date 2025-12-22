//ติดตั้ง cookie ที่จัดการ user ธรรมดา
import { Cookies } from "react-cookie";
const cookie = new Cookies();

const getAccessToken = () => {
  const user = getUser();
  return user?.accessToken;
};

const getUser = () => {
  const user = cookie.get("user");
  return user;
};

//ลบ user ทั้ง object
const removeUser = () => {
  cookie.remove("user", { path: "/" });
};

//เอาไปset in cookie
const setUser = (user) => {
  if (user) {
  cookie.set(
    "user",
    JSON.stringify({
      id: user?.id,
      username: user?.username,
      accessToken: user?.accessToken,
    }),
    {
      path: "/",
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), //24*60*60
    }
  );
} else {
  removeUser();
}
}

const TokenService = {
  getAccessToken,
  getUser,
  setUser,
  removeUser,
};

export default TokenService;
