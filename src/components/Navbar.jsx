import React from "react";

const NavBar = () => {
  const menuItems = [
    { link: "/", text: "Home" },
    { link: "/create", text: "Create New Post" },
  ];
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {menuItems.map((item) => (
              <li>
                <a href={item.link}>{item.text}</a>
              </li>
            ))}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">SE NPRU Blog</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {menuItems.map((item) => (
            <li>
              <a href={item.link}>{item.text}</a>
            </li>
          ))}
        </ul>
      </div>
      <div className="navbar-end space-x-2 gap-3">
        <a
          href="/register"
          className="btn btn-outline btn-primary rounded-xl shadow-sm hover:shadow-md hover:scale-105 transition-transform"
        >
          Register
        </a>
        <a
          href="/login"
          className="btn btn-outline btn-success rounded-xl shadow-sm hover:shadow-md hover:scale-105 transition-transform"
        >
          Login
        </a>
      </div>
    </div>
  );
};

export default NavBar;
