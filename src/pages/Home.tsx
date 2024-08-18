import { memo, useState } from "react";
import { useGetPostsQuery } from "../store/postApi";
import { Pagination, SearchBar } from "../components";
import { PostsList, Container } from "../components/index";

const Home = memo(() => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data, isLoading: isLoadingPosts } = useGetPostsQuery({
    page,
    search,
    limit: 10,
  });

  // posts
  // totalPages

  const { posts = [], totalPages = 1 } = data ?? {};

  return (
    <Container
      RenderingConditions={[posts.length > 0]}
      LoadingConditions={[isLoadingPosts]}
      backUpElem={
        <h1 className="text-4xl font-semibold  text-center">No Posts Found</h1>
      }
    >
      <div>
        <SearchBar setSearch={setSearch}/>
        <PostsList posts={posts} />
        <Pagination
          totalPages={totalPages}
          currentPage={page}
          onPageChange={setPage}
        />
      </div>
    </Container>
  );
});

export default Home;
