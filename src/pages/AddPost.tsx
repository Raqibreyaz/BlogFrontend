import React from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { useCreatePostMutation } from "../store/postApi";
import { Container } from "../components";
import { catchAndShowMessage } from "../utils/catchAndShowMessage";
import { PostForm } from "../components";
import { FormValues } from "../components/PostForm";

const AddPost: React.FC = () => {
  const [CreatePost, { isLoading: isCreatingPost }] = useCreatePostMutation();

  const methods = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const formData = new FormData();

    (Object.keys(data) as (keyof FormValues)[]).forEach((key) => {
      formData.append(
        key,
        data[key] instanceof FileList ? data[key][0] : data[key]
      );
    });

    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    catchAndShowMessage(CreatePost, formData);
  };

  return (
    <Container
      LoadingConditions={[isCreatingPost]}
      className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg"
    >
      <h2 className="text-2xl font-semibold mb-6 text-center capitalize">
        Create a Post
      </h2>
      <FormProvider {...methods}>
        <PostForm onSubmit={onSubmit} />
      </FormProvider>
    </Container>
  );
};

export default AddPost;
