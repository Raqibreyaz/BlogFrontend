// src/store/commentApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Comment {
  id: string;
  content: string;
  postId: string;
  createdBy: string;
}

interface CreateCommentRequest {
  content: string;
  postId: string;
}

interface CreateCommentResponse {
  success: boolean;
  message: string;
  comment: Comment;
}

interface GetCommentsResponse {
  success: boolean;
  comments: Comment[];
}

export const commentApi = createApi({
  reducerPath: 'commentApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_URL, credentials: 'include' }),
  endpoints: (builder) => ({
    createComment: builder.mutation<CreateCommentResponse, CreateCommentRequest>({
      query: (data) => ({
        url: 'create-comment',
        method: 'POST',
        body: data,
      }),
    }),
    getComments: builder.query<GetCommentsResponse, string>({
      query: (postId) => `get-comments/${postId}`,
    }),
  }),
});

export const { useCreateCommentMutation, useGetCommentsQuery } = commentApi;
