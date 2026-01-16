import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const NavBar = () => {
  // ดึงข้อมูล user และฟังก์ชัน logout จาก context
  const { userInfo, logOut } = useContext(UserContext);
console.log("userInfo from context:", userInfo);

  // ถ้ามี user → แสดงชื่อ
  const username = userInfo?.username;

  return (
    <div className="navbar bg-base-100 shadow-sm">
      {/* โลโก้ */}
      <div className="navbar-start">
        <Link className="btn btn-ghost text-xl" to="/">
          SE NPRU Blog
        </Link>
      </div>

      {/* ถ้า login แล้ว */}
      {username ? (
        <div className="navbar-end space-x-2">
          <Link className="btn" to="/create">
            Create a new post
          </Link>

          <button className="btn" onClick={logOut}>
            Logout ({username})
          </button>
        </div>
      ) : (
        // ถ้ายังไม่ login
        <div className="navbar-end space-x-2">
          <Link className="btn" to="/login">
            Login
          </Link>
          <Link className="btn" to="/register">
            Register
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavBar;
