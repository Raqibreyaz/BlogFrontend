import React, { useCallback, useEffect } from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { useCreatePostMutation } from "../store/postApi";
import { Container } from "../components";
import { catchAndShowMessage } from "../utils/catchAndShowMessage";
import { PostForm } from "../components";
import { FormValues } from "../components/PostForm";
import { useNavigate } from "react-router-dom";

const AddPost: React.FC = () => {
  const [
    CreatePost,
    { isLoading: isCreatingPost, isSuccess: isSuccessfullyCreatedPost },
  ] = useCreatePostMutation();

  const methods = useForm<FormValues>();
  const Navigate = useNavigate();

  const onSubmit: SubmitHandler<FormValues> = useCallback((data) => {
    const formData = new FormData();

    (Object.keys(data) as (keyof FormValues)[]).forEach((key) => {
      if (data[key])
        formData.append(
          key,
          data[key] instanceof FileList ? data[key][0] : data[key]
        );
    });

    catchAndShowMessage(CreatePost, formData);
  }, []);

  useEffect(() => {
    if (isSuccessfullyCreatedPost) Navigate("/");
  }, [isSuccessfullyCreatedPost]);

  return (
    <Container
      className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg border border-gray-300"
    >
      <h2 className="text-2xl font-semibold mb-6 text-center capitalize">
        Create a Post
      </h2>
      <FormProvider {...methods}>
        <PostForm onSubmit={onSubmit} loading={isCreatingPost}/>
      </FormProvider>
    </Container>
  );
};

export default AddPost;
