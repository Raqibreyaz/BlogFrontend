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
      <div className="flex items-start sm:gap-4 gap-2 ">
        <img
          src={user?.image}
          alt="User"
          className="size-12 max-sm:size-9 rounded-full"
        />
        <div className="gap-4 max-sm:gap-2 flex w-[90%] max-sm:flex-col">
          <input
            type="text"
            {...register("content", { required: "This Field is Required!!" })}
            className="flex-1 sm:px-4 px-2 py-3 max-sm:py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition max-sm:placeholder:text-sm max-sm:w-full"
            placeholder="Write a comment..."
          />
          <button
            onClick={handleSubmit(handleAddComment)}
            disabled={
              isSubmitting ||
              Object.keys(errors).length > 0 ||
              isCreatingComment
            }
            className="px-5 max-sm:px-3 max-w-[50%] ml-auto py-2 max-sm:text-sm text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition "
          >
            {isCreatingComment ? "Loading..." : "Comment"}
          </button>
        </div>
      </div>
      {errors.content && (
        <span className="text-sm text-red-500">{errors.content?.message}</span>
      )}
    </form>
  );
});

export default AddComment;
