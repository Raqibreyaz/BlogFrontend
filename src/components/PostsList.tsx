import { memo } from "react";
import { Post } from "../interfaces/post.interfaces";
import Container from "./Container";
import { Link } from "react-router-dom";

const PostCard = memo(({ title, creator, createdAt, image, _id }: Post) => {
  return (
    <div className="flex flex-col justify-between relative p-4 max-sm:pb-10 border border-gray-400 rounded-md mx-auto">
      <Link to={`/post-details/${_id}`} className="size-full absolute"></Link>
      <img className="w-full h-80 object-fill" src={image} alt="Post image" />
      <div className="pt-4 capitalize text-wrap">
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
    <Container className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {posts.map((post) => (
        <PostCard key={post._id} {...post} />
      ))}
    </Container>
  );
});

export default PostsList;
