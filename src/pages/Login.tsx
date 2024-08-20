import React, { useCallback, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { catchAndShowMessage } from "../utils/catchAndShowMessage";
import {
  useGetUserQuery,
  useLoginUserMutation,
  userApi,
} from "../store/userApi";
import { useNavigate } from "react-router-dom";

type LoginFormValues = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>();

  const [
    LoginUser,
    { isLoading: isLoggingUser, isSuccess: isSuccessfullyLoggedIn },
  ] = useLoginUserMutation();

  const { refetch } = useGetUserQuery();
  const Navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginFormValues> = useCallback(
    (data) => {
      // Handle login logic here
      catchAndShowMessage(LoginUser, data);
    },
    [LoginUser]
  );

  const getLoginName = useCallback(
    (name: string) => name as keyof LoginFormValues,
    []
  );

  useEffect(() => {
    if (isSuccessfullyLoggedIn) {
      console.log("successfully logged in");
      refetch();
      Navigate("/");
    }
  }, [isSuccessfullyLoggedIn, Navigate, refetch]);
  console.log("login rendered");

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {[
          {
            name: "email",
            cond: {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            },
          },
          {
            name: "password",
            cond: {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            },
          },
        ].map(({ name, cond }) => (
          <div key={name}>
            <label className="capitalize block text-sm font-medium text-gray-700">
              {name}
            </label>
            <input
              type={name}
              {...register(getLoginName(name), cond)}
              className={`mt-1 block w-full p-2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 placeholder:capitalize focus:ring-indigo-500 focus:border-indigo-500 ${
                errors[getLoginName(name)] ? "border-red-500" : ""
              }`}
              placeholder={`Enter your ${name}`}
            />
            {errors[getLoginName(name)] && (
              <p className="text-red-500 text-sm mt-1">
                {errors[getLoginName(name)]?.message}
              </p>
            )}
          </div>
        ))}
        {/* Submit Button */}
        <button
          type="submit"
          disabled={
            isSubmitting || Object.keys(errors).length > 0 || isLoggingUser
          }
          className="w-full px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {isLoggingUser ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
