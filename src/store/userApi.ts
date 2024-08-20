import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Response } from "../interfaces/response.interfaces";

interface GetUserResponse extends Response {
  user: { email: string; username: string; image: string; _id: string };
}

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
  reducerPath: "user",
  tagTypes: ["User"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/users/`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation<Response, FormData>({
      query: (data) => ({
        url: `register-user`,
        body: data,
        method: "POST",
      }),
    }),

    loginUser: builder.mutation<Response, { email: string; password: string }>({
      query: (data) => ({
        url: `login-user`,
        body: data,
        method: "POST",
      }),
    }),

    logoutUser: builder.mutation<Response, void>({
      query: () => ({
        url: `logout-user`,
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),

    getUser: builder.query<GetUserResponse, void>({
      query: () => ({
        url: `get-user`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetUserQuery,
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
} = userApi;
