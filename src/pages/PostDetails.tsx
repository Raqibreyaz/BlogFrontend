import React from "react";
import HTMLReactParser from "html-react-parser/lib/index";
import { useGetPostQuery } from "../store/postApi";
import { useParams } from "react-router-dom";
import { Container } from "../components";
import CommentSection from "../components/CommentSection";
import { FaEdit, FaTrash } from "react-icons/fa";

const PostDetails: React.FC = () => {
  const postId = useParams().id;
  if (!postId) return null;

  const { data: { post = null } = {}, isLoading: isLoadingPost } =
    useGetPostQuery(postId);

  const { title, content, image, creator, createdAt } = post ?? {};
  console.log(content);
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
      LoadingConditions={[isLoadingPost]}
      className="max-lg:w-[90%] w-[70%]  mx-auto p-4 bg-white shadow-lg rounded-lg"
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
            <h3 className="text-gray-800 font-semibold">{creator?.username}</h3>
            <p className="text-sm text-gray-500">
              {createdAt ? new Date(createdAt).toLocaleDateString() : ""}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={}>
            <FaEdit className="text-yellow-600 size-6" />
          </button>
          <button>
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
        <h2 className="font-semibold text-gray-800">{title ?? ""}</h2>
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
