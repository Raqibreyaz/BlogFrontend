import { memo, useCallback, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useGetUserQuery, useLogoutUserMutation } from "../store/userApi";
import Container from "./Container";
import { userApi } from "../store/userApi";
import { useDispatch } from "react-redux";
import { catchAndShowMessage } from "../utils/catchAndShowMessage";

const Navbar = memo(() => {
  const {
    data: { user } = {},
    isLoading: isGettingUser,
  } = useGetUserQuery();

  const [
    LogoutUser,
    { isLoading: isLoggingOutUser, isSuccess: isSuccessfullyLogoutUser },
  ] = useLogoutUserMutation();

  const logout = useCallback(() => {
    catchAndShowMessage(LogoutUser);
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("user logged out", isSuccessfullyLogoutUser);
    if (isSuccessfullyLogoutUser) {
      console.log("refecthing");
      dispatch(userApi.util.resetApiState());
    }
  }, [isSuccessfullyLogoutUser]);

  return (
    <Container
      className="bg-gray-900 text-white p-4 flex justify-between items-center sticky top-0 z-50"
      RenderingConditions={[!isGettingUser]}
    >
      <div className="text-3xl font-bold">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "text-white-300" : "")}
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
        {user ? (
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
              to="/register"
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
    </Container>
  );
});

export default Navbar;
