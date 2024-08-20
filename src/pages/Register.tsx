import React, { useCallback, useEffect } from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import {  useRegisterUserMutation } from "../store/userApi";
import { catchAndShowMessage } from "../utils/catchAndShowMessage";
import { Container, FilePreviewInput } from "../components";
import { useNavigate } from "react-router-dom";

type RegistrationFormValues = {
  image: FileList;
  email: string;
  password: string;
  username: string;
};

const RegistrationForm: React.FC = () => {
  const methods = useForm<RegistrationFormValues>();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const [
    RegisterUser,
    { isLoading: isRegisteringUser, isSuccess: isSuccessfullyRegistered },
  ] = useRegisterUserMutation();

  const onSubmit: SubmitHandler<RegistrationFormValues> = useCallback(
    (data) => {
      const formData = new FormData();

      (Object.keys(data) as (keyof RegistrationFormValues)[]).forEach((key) => {
        formData.append(
          key,
          data[key] instanceof FileList ? data[key][0] : data[key]
        );
      });

      catchAndShowMessage(RegisterUser, formData);
    },
    []
  );

  const getRegistrationName = useCallback(
    (name: string) =>
      name as keyof RegistrationFormValues /*"image"|"password"|"email"|"username"*/,
    []
  );

  const Navigate = useNavigate();

  useEffect(() => {
    if (isSuccessfullyRegistered) {
      Navigate("/");
    }
  }, [isSuccessfullyRegistered]);

  return (
    <Container className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Register</h2>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FilePreviewInput
            label="profile image"
            name="image"
            props={{ accept: "image/*" }}
          />
          {[
            {
              label: "username",
              name: "username",
              cond: { required: "Username is required" },
              type: "text",
              placeholder: "enter your username",
            },
            {
              label: "email",
              name: "email",
              cond: {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              },
              type: "email",
              placeholder: "enter your email",
            },
            {
              label: "password",
              name: "password",
              cond: {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "password must be at least 8 characters",
                },
              },
              type: "password",
              placeholder: "enter your password",
            },
          ].map(({ label, name, cond, ...props }) => (
            <div key={name}>
              <label className="block text-sm capitalize font-medium text-gray-700">
                {label}
              </label>
              <input
                {...register(getRegistrationName(name), { ...cond })}
                {...props}
                className={`mt-1 p-2 block placeholder:capitalize w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 ${
                  errors[getRegistrationName(name)] ? "border-red-500" : ""
                }`}
              />
              {errors[getRegistrationName(name)] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[getRegistrationName(name)]?.message}
                </p>
              )}
            </div>
          ))}
          {/* Submit Button */}
          <button
            type="submit"
            disabled={
              Object.values(errors).length > 0 ||
              isSubmitting ||
              isRegisteringUser
            }
            className="w-full px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {isRegisteringUser ? "Loading..." : "Register"}
          </button>
        </form>
      </FormProvider>
    </Container>
  );
};

export default RegistrationForm;
