// src/store/postApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Response } from "../interfaces/response.interfaces";
import { Post } from "../interfaces/post.interfaces";

interface GetPostResponse extends Response {
  post: Post;
}

interface GetPostsRequests {
  page?: number;
  limit?: number;
  search?: string;
}

interface GetPostsResponse extends Response {
  posts: Post[];
  totalPages: number;
}

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/posts`,
    credentials: "include",
  }),
  tagTypes: ["Posts", "Post"],
  endpoints: (builder) => ({
    createPost: builder.mutation<Response, FormData>({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Posts"],
    }),
    updatePost: builder.mutation<Response, { id: string; data: FormData }>({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Post", id }],
    }),
    getPost: builder.query<GetPostResponse, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Post", id }],
    }),
    getPosts: builder.query<GetPostsResponse, GetPostsRequests>({
      query: ({ search = "", page = 1, limit = 10 }) => ({
        url: `?search=${search}&&page=${page}&&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["Posts"],
    }),
    deletePost: builder.mutation<Response, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Posts"],
    }),
  }),
});

export const {
  useCreatePostMutation,
  useUpdatePostMutation,
  useGetPostQuery,
  useGetPostsQuery,
  useDeletePostMutation,
} = postApi;
