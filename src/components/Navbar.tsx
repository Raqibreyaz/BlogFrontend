import { memo, useCallback, useEffect } from "react";
import { NavLink, NavLinkRenderProps, useNavigate } from "react-router-dom";
import { useGetUserQuery, useLogoutUserMutation } from "../store/userApi";
import Container from "./Container";
import { userApi } from "../store/userApi";
import { useDispatch } from "react-redux";
import { catchAndShowMessage } from "../utils/catchAndShowMessage";

const applyClass = ({
  active,
  inActive,
  common = "",
}: {
  active: string;
  inActive: string;
  common?: string;
}) => {
  return ({ isActive }: NavLinkRenderProps) =>
    `${isActive ? active : inActive} ${common}`;
};

const Navbar = memo(() => {
  const { data: { user } = {}, isLoading: isGettingUser } = useGetUserQuery();

  const [
    LogoutUser,
    { isLoading: isLoggingOutUser, isSuccess: isSuccessfullyLogoutUser },
  ] = useLogoutUserMutation();

  const logout = useCallback(() => {
    catchAndShowMessage(LogoutUser);
  }, []);

  const dispatch = useDispatch();
  const Navigate = useNavigate();

  useEffect(() => {
    if (isSuccessfullyLogoutUser) {
      dispatch(userApi.util.resetApiState());
      Navigate("/");
    }
  }, [isSuccessfullyLogoutUser]);
  console.log("rendering navbar");

  return (
    <Container
      className="bg-gray-900 text-white sm:p-4 max-sm:py-4 max-sm:px-2 flex justify-between items-center sticky top-0 z-50"
      RenderingConditions={[!isGettingUser]}
    >
      <div className="text-3xl max-sm:text-xl font-bold">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "text-white-300" : "")}
        >
          My Blog
        </NavLink>
      </div>
      <div className="flex sm:space-x-4 gap-2 items-center  max-sm:text-sm">
        <NavLink
          to="/"
          className={applyClass({
            active:
              "text-yellow-300 hover:text-yellow-300 bg-pink-800 px-2 py-1 rounded-md",
            inActive: "hover:text-yellow-300",
            common:"capitalize"
          })}
        >
          Home
        </NavLink>

        {[
          {
            to: "/login",
            name: "login",
            protected: false,
          },
          {
            to: "/register",
            name: "signup",
            protected: false,
          },
          {
            to: "/add-post",
            name: "add post",
            protected: true,
          },
        ].map((props) => (
          <NavLink
            to={props.to}
            key={props.name}
            className={applyClass({
              active:
                "text-yellow-300 hover:text-yellow-300 bg-pink-800 rounded px-2 py-1",
              inActive: "hover:text-yellow-300",
              common: `text-white capitalize ${
                props.protected !== !!user ? "hidden" : ""
              }`,
            })}
          >
            {props.name}
          </NavLink>
        ))}

        {user && (
          <button onClick={logout} className="hover:text-yellow-300">
            Logout
          </button>
        )}
      </div>
    </Container>
  );
});

export default Navbar;
