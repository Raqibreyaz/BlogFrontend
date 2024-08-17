import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface response {
  success: boolean;
  message: string;
}

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation<response, FormData>({
      query: (data) => ({
        url: `register-user`,
        body: data,
        method: "POST",
      }),
    }),

    loginUser: builder.mutation<response, { email: string; password: string }>({
      query: (data) => ({
        url: `login-user`,
        body: data,
        method: "POST",
      }),
    }),

    getUser: builder.query<response, void>({
      query: () => ({
        url: `get-user`,
        method: "GET",
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetUserQuery,
  useRegisterUserMutation,
  useLoginUserMutation,
} = userApi;
