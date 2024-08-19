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
      className="max-w-2xl mx-auto p-6 space-y-6 bg-white shadow-md rounded-lg"
    >
      {/* Input for creating a new comment */}
      <AddComment />

      {/* List of comments */}
      {comments && comments.length > 0 && (
        <div className="space-y-6">
          {comments?.map((comment) => (
            <div
              key={comment._id}
              className="flex items-start space-x-4 p-4 bg-gray-100 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <img
                src={comment.userDetails.image}
                alt={comment.userDetails.username}
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold">
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
