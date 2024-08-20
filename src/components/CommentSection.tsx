import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetCommentsQuery } from "../store/commentApi";
import { AddComment, Container, Pagination } from "./index";

const CommentSection: React.FC = () => {
  const postId = useParams().id;
  if (!postId) return null;

  const [page, setPage] = useState(1);

  const {
    data: { comments, totalComments, totalPages } = {},
    isLoading: isLoadingComments,
  } = useGetCommentsQuery({ postId, page, limit: 10 });

  return (
    <Container
      LoadingConditions={[isLoadingComments]}
      RenderingConditions={[!!comments, totalPages !== undefined]}
      className="max-w-2xl mx-auto space-y-6 mt-6 rounded-lg"
    >
      {/* Input for creating a new comment */}
      <AddComment />

      {/* List of comments */}
      {comments && comments.length > 0 && (
        <div className="space-y-6">
          {comments?.map((comment) => (
            <div
              key={comment._id}
              className="flex flex-wrap items-start space-x-4 p-4 max-sm:p-2 bg-gray-100 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <img
                src={comment.userDetails.image}
                alt={comment.userDetails.username}
                className="size-8 sm:size-10 rounded-full"
              />
          
              <div className="flex-1 leading-tight w-full max-sm:text-sm">
                <div className="flex items-center justify-between leading-tight ">
                  <h4 className="text-lg font-semibold capitalize">
                    {comment.userDetails.username}
                  </h4>
                  <span className="text-sm text-gray-400">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="mt-2 text-gray-700">{comment.content}</p>
              </div>
            </div>
          ))}
          <Pagination
            currentPage={page}
            totalPages={totalPages ?? 1}
            onPageChange={setPage}
          />
        </div>
      )}
    </Container>
  );
};

export default CommentSection;
