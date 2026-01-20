import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const { userInfo, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const username = userInfo?.username;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="navbar sticky top-0 z-50 px-6 backdrop-blur-md bg-base-100/80 border-b border-base-300">
      {/* LEFT */}
      <div className="navbar-start">
        <Link
          to="/"
          className="
            text-2xl font-extrabold tracking-tight
            text-base-content
            hover:text-primary transition-colors
          "
        >
          MERN Stack Blog
        </Link>
      </div>

      {/* RIGHT */}
      {username ? (
        <div className="navbar-end gap-3">
          {/* Create */}
          <Link
            to="/create"
            className="
              btn btn-sm sm:btn-md
              bg-primary text-primary-content
              hover:bg-primary-focus
              rounded-full font-semibold
            "
          >
            Create
          </Link>

          {/* Profile Dropdown */}
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="
                btn btn-outline btn-sm sm:btn-md
                rounded-full font-medium
                border-base-300
                hover:border-primary hover:text-primary
              "
            >
              {username}
            </label>

            <ul
              tabIndex={0}
              className="
                dropdown-content menu
                mt-3 w-48
                rounded-xl bg-base-100
                border border-base-300 shadow
              "
            >
              <li className="border-t border-base-200 mt-1">
                <button
                  onClick={handleLogout}
                  className="text-error"
                >
                  ออกจากระบบ
                </button>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="navbar-end gap-2">
          {/* Login */}
          <Link
            to="/login"
            className="
              btn btn-outline btn-sm sm:btn-md
              border-base-300
              hover:border-primary
              hover:text-primary
              rounded-full font-medium
            "
          >
            Login
          </Link>

          {/* Register */}
          <Link
            to="/register"
            className="
              btn btn-outline btn-sm sm:btn-md
              border-base-300
              hover:border-primary
              hover:text-primary
              rounded-full font-medium
            "
          >
            Register
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
