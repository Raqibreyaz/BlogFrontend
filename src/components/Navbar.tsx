import React, { memo } from "react";
import { NavLink } from "react-router-dom";

const Navbar = memo(() => {
  const isLoggedIn = false;
  const logout = () => {};
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <div className="text-3xl font-bold">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "text-yellow-300" : "")}
        >
          My Blog
        </NavLink>
      </div>
      <div className="flex space-x-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-yellow-300 hover:text-yellow-300"
              : "hover:text-yellow-300"
          }
        >
          Home
        </NavLink>
        {isLoggedIn ? (
          <>
            <NavLink
              to="/add-post"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-300 hover:text-yellow-300"
                  : "hover:text-yellow-300"
              }
            >
              Add Post
            </NavLink>
            <button onClick={logout} className="hover:text-yellow-300">
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-300 hover:text-yellow-300"
                  : "hover:text-yellow-300"
              }
            >
              Login
            </NavLink>
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-300 hover:text-yellow-300"
                  : "hover:text-yellow-300"
              }
            >
              Signup
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
});

export default Navbar;
