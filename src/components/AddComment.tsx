import { memo, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCreateCommentMutation } from "../store/commentApi";
import { SubmitHandler, useForm } from "react-hook-form";
import { useGetUserQuery } from "../store/userApi";
import { catchAndShowMessage } from "../utils/catchAndShowMessage";

interface CommentFormValues {
  content: string;
}

const AddComment = memo(() => {
  const postId = useParams().id;
  if (!postId) return null;

  const { data: { user } = {} } = useGetUserQuery();

  const [
    CreateComment,
    { isLoading: isCreatingComment, isSuccess: isSuccessfullyCreatedComment },
  ] = useCreateCommentMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ defaultValues: { content: "" } });

  const handleAddComment: SubmitHandler<CommentFormValues> = (data): void => {
    catchAndShowMessage(CreateComment, { data, postId });
  };

  useEffect(() => {
    if (isSuccessfullyCreatedComment) reset();
  }, [isSuccessfullyCreatedComment]);

  return (
    <form className={!user ? "hidden" : ""}>
      <div className="flex items-center space-x-4">
        <img src={user?.image} alt="User" className="w-12 h-12 rounded-full" />
        <input
          type="text"
          {...register("content", { required: "This Field is Required!!" })}
          className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Write a comment..."
        />
        <button
          onClick={handleSubmit(handleAddComment)}
          disabled={
            isSubmitting || Object.keys(errors).length > 0 || isCreatingComment
          }
          className="px-5 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          {isCreatingComment ? "Loading..." : "Comment"}
        </button>
      </div>
      {errors.content && (
        <span className="text-sm text-red-500">{errors.content?.message}</span>
      )}
    </form>
  );
});

export default AddComment;
