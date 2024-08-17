// src/store/postApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Post {
  id: string;
  title: string;
  content: string;
  image?: string;
  createdBy: string;
}

interface CreatePostRequest {
  title: string;
  content: string;
  image?: string;
}

interface UpdatePostRequest {
  id: string;
  title?: string;
  content?: string;
  image?: string;
}

interface CreatePostResponse {
  success: boolean;
  message: string;
  post: Post;
}

interface UpdatePostResponse {
  success: boolean;
  message: string;
  post: Post;
}

interface GetPostResponse {
  success: boolean;
  post: Post;
}

interface GetPostsResponse {
  success: boolean;
  posts: Post[];
}

interface DeletePostResponse {
  success: boolean;
  message: string;
}

export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_URL, credentials: 'include' }),
  endpoints: (builder) => ({
    createPost: builder.mutation<CreatePostResponse, CreatePostRequest>({
      query: (data) => ({
        url: 'create-post',
        method: 'POST',
        body: data,
      }),
    }),
    updatePost: builder.mutation<UpdatePostResponse, UpdatePostRequest>({
      query: (data) => ({
        url: `update-post/${data.id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    getPost: builder.query<GetPostResponse, string>({
      query: (id) => `get-post/${id}`,
    }),
    getPosts: builder.query<GetPostsResponse, void>({
      query: () => 'get-posts',
    }),
    deletePost: builder.mutation<DeletePostResponse, string>({
      query: (id) => ({
        url: `delete-post/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { 
  useCreatePostMutation, 
  useUpdatePostMutation, 
  useGetPostQuery, 
  useGetPostsQuery, 
  useDeletePostMutation 
} = postApi;
