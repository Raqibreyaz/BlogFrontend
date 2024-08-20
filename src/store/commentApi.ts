// src/store/commentApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Response } from "../interfaces/response.interfaces";

interface Comment {
  _id: string;
  content: string;
  postId: string;
  userDetails: {
    username: string;
    image: string;
  };
  createdAt: string;
}

interface CreateCommentRequest {
  postId: string;
  data: {
    content: string;
  };
}

interface GetCommentsRequest {
  page?: number;
  limit?: number;
  postId: string;
}

interface GetCommentsResponse extends Response {
  comments: Comment[];
  totalComments: number;
  totalPages: number;
}

export const commentApi = createApi({
  reducerPath: "commentApi",
  tagTypes: ["Comments"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/comments`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createComment: builder.mutation<Response, CreateCommentRequest>({
      query: ({ postId, data }) => ({
        url: `/create-comment/${postId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (_1, _, { postId }) => [
        { type: "Comments", id: postId },
      ],
    }),
    getComments: builder.query<GetCommentsResponse, GetCommentsRequest>({
      query: ({ postId, page = 1, limit = 10 }) => ({
        url: `/get-comments/${postId}?page=${page}&&limit=${limit}`,
        method: "GET",
      }),
      providesTags: (_1, _, { postId }) => [
        { type: "Comments", id: postId },
      ],
    }),
  }),
});

export const { useCreateCommentMutation, useGetCommentsQuery } = commentApi;
