import React, { useCallback, useEffect } from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { useGetPostQuery, useUpdatePostMutation } from "../store/postApi";
import { Container } from "../components";
import { catchAndShowMessage } from "../utils/catchAndShowMessage";
import { PostForm } from "../components";
import { FormValues } from "../components/PostForm";
import { useNavigate, useParams } from "react-router-dom";

const EditPost: React.FC = () => {
  const postId = useParams().id;
  if (!postId) return null;

  const [
    UpdatePost,
    { isLoading: isUpdatingPost, isSuccess: isSuccessfullyUpdatedPost },
  ] = useUpdatePostMutation();

  const { data: { post } = {}, isLoading: isGettingPost } =
    useGetPostQuery(postId);

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

    catchAndShowMessage(UpdatePost, { id: postId, data: formData });
  }, []);

  // navigate user to the post after updating it
  useEffect(() => {
    if (isSuccessfullyUpdatedPost) Navigate(`/post-details/${postId}`);
  }, [isSuccessfullyUpdatedPost]);

  useEffect(() => {
    if (post) {
      methods.reset({
        title: post.title,
        content: post.content ?? "",
      });
    }
  }, [post, isGettingPost]);

  return (
    <Container
      className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg"
      RenderingConditions={[!!post, !isGettingPost]}
      LoadingConditions={[isGettingPost]}
    >
      <h2 className="text-2xl font-semibold mb-6 text-center capitalize">
        Edit Post
      </h2>
      <FormProvider {...methods}>
        <PostForm
          onSubmit={onSubmit}
          loading={isUpdatingPost}
          image={post?.image}
        />
      </FormProvider>
    </Container>
  );
};

export default EditPost;
