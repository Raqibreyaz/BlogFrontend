import { memo } from "react";
import { Post } from "../interfaces/post.interfaces";
import Container from "./Container";
import { Link } from "react-router-dom";

const PostCard = memo(({ title, creator, createdAt, image, _id }: Post) => {
  return (
    <div className="h-80vh w-[80%] relative p-4 border border-gray-500 rounded-md mx-auto">
      <Link
        to={`/post-details/${_id}`}
        className="size-full absolute"
      ></Link>
      <img
        className="w-full h-[70vh]"
        src={image}
        alt="Post image"
      />
      <div className=" w-full py-4 capitalize">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">
          By {creator.username} on {new Date(createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
});

const PostsList = memo(({ posts }: { posts: Post[] }) => {
  return (
    <Container
    >
      {posts.map((post) => (
        <PostCard key={post._id} {...post} />
      ))}
    </Container>
  );
});

export default PostsList;
