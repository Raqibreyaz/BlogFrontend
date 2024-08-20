import React, { useCallback, useEffect } from "react";
import HTMLReactParser from "html-react-parser/lib/index";
import { useDeletePostMutation, useGetPostQuery } from "../store/postApi";
import { useNavigate, useParams } from "react-router-dom";
import { Container } from "../components";
import CommentSection from "../components/CommentSection";
import { FaEdit, FaTrash } from "react-icons/fa";
import { catchAndShowMessage } from "../utils/catchAndShowMessage";
import { showMessage } from "../utils/showMessage";
import { useGetUserQuery } from "../store/userApi";

const PostDetails: React.FC = () => {
  const postId = useParams().id;
  if (!postId) return null;

  const { data: { post = null } = {}, isLoading: isLoadingPost } =
    useGetPostQuery(postId);

  const { data: { user } = {}, isLoading: isGettingUser } = useGetUserQuery();

  const [
    DeletePost,
    { isLoading: isDeletingPost, isSuccess: isSuccessfullyDeletedPost },
  ] = useDeletePostMutation();

  const { title, content, image, creator, createdAt } = post ?? {};

  const Navigate = useNavigate();

  const handleEdit = useCallback(() => {
    Navigate(`/edit-post/${postId}`);
  }, []);

  const handleDelete = useCallback(() => {
    showMessage({
      title: "Delete Post",
      message: "Do You Really Want To Delete this Post",
      icon: "error",
      showConfirmButton: true,
      confirmButtonText: "Delete",
      showCancelButton: true,
    }).then((confirm) => {
      if (confirm) catchAndShowMessage(DeletePost, postId);
    });
  }, []);

  // when you delete post then navigate to home
  useEffect(() => {
    if (isSuccessfullyDeletedPost) {
      Navigate("/");
    }
  }, [isSuccessfullyDeletedPost]);

  return (
    <Container
      RenderingConditions={[
        !!post,
        !!title,
        !!content,
        !!image,
        !!creator,
        !!createdAt,
      ]}
      LoadingConditions={[isLoadingPost, isDeletingPost, isGettingUser]}
      className="max-lg:w-[90%] w-[70%]  mx-auto p-4  shadow-lg rounded-lg"
    >
      {/* Header: Profile Image and Username */}
      <div className="flex justify-between">
        <div className="flex items-center mb-4 space-x-2">
          <div className="size-10 rounded-full overflow-hidden">
            <img
              src={creator?.image ?? ""}
              className="size-full"
              alt={creator?.username ?? ""}
            />
          </div>
          <div>
            <h3 className="text-gray-800 font-semibold capitalize">{creator?.username}</h3>
            <p className="text-sm text-gray-500">
              {createdAt ? new Date(createdAt).toLocaleDateString() : ""}
            </p>
          </div>
        </div>
        <div
          className={`flex items-center gap-2 ${
            post?.creator._id === user?._id ? "" : "hidden"
          }`}
        >
          <button onClick={handleEdit}>
            <FaEdit className="text-yellow-600 size-6" />
          </button>
          <button onClick={handleDelete}>
            <FaTrash className="text-red-600 size-5" />
          </button>
        </div>
      </div>

      {/* Post Image */}
      <div className="mb-4">
        <img
          src={image ?? ""}
          alt={title ?? ""}
          className="w-full rounded-lg object-cover"
        />
      </div>
      {/* Post Content */}
      <div className="mb-2">
        <h2 className="font-semibold text-gray-900 text-2xl max-sm:text-xl capitalize my-2">{title ?? ""}</h2>
        <div>{HTMLReactParser(content ?? "")}</div>
      </div>

      {/* Timestamp */}
      <p className="text-sm text-gray-500">
        {createdAt ? new Date(createdAt).toLocaleTimeString() : ""}
      </p>
      <div>
        <CommentSection />
      </div>
    </Container>
  );
};

export default PostDetails;
