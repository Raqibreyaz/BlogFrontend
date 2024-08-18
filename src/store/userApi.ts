import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Response } from "../interfaces/response.interfaces";

interface GetUserResponse extends Response{
  user:{email:string,username:string,image:string}
}

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/",
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

    getUser: builder.query<GetUserResponse, void>({
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
