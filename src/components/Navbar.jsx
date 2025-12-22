import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const NavBar = () => {
  const { userInfo, logOut } = useContext(UserContext);
  const username = userInfo?.username;

  return (
    <div className="navbar bg-base-100 shadow-sm">
      {/* Navbar Start */}
      <div className="navbar-start">
        <a href="/" className="btn btn-ghost text-xl">
          SE NPRU Blog
        </a>
      </div>

      {/* Navbar End */}
      <div className="navbar-end space-x-3">
        {!username ? (
          <>
            <a
              href="/create"
              className="btn btn-outline btn-primary rounded-xl"
            >
              Create New Post
            </a>
            <button
              onClick={logOut}
              href="/login"
              className="btn btn-outline btn-error rounded-xl"
            >
              Logout ({username})
            </button>
          </>
        ) : (
          <>
            <a
              href="/register"
              className="btn btn-outline btn-primary rounded-xl"
            >
              Register
            </a>
            <a href="/login" className="btn btn-outline btn-success rounded-xl">
              Login
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
