import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";

const NavBar = () => {
  const { userInfo, logOut } = useContext(UserContext);
  const username = userInfo?.username;

  return (
    <div className="navbar bg-base-100 shadow-sm">
      {/* Navbar Start */}
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost text-xl">
          SE NPRU Blog
        </Link>
      </div>

      {/* Navbar End */}
      <div className="navbar-end space-x-3">
        {username ? (
          <>
            <Link
              to="/create"
              className="btn btn-outline btn-primary rounded-xl"
            >
              Create New Post
            </Link>

            <button
              onClick={logOut}
              className="btn btn-outline btn-error rounded-xl"
            >
              Logout ({username})
            </button>
          </>
        ) : (
          <>
            <Link
              to="/register"
              className="btn btn-outline btn-primary rounded-xl"
            >
              Register
            </Link>

            <Link
              to="/login"
              className="btn btn-outline btn-success rounded-xl"
            >
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
