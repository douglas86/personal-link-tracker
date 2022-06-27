import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { pagination } from "../molecule/pagination";
import { Container } from "react-bootstrap";
import { spinner } from "../atom/spinner";

const Pagination = ({ data, len, router }) => {
  const [posts, setPosts] = useState(data);
  const [hasMore, setHasMore] = useState(true);

  const getMorePost = async () => {
    const res = await fetch(
      `/api/pagination?_router=${router}&_start=${posts.length}&_limit=2`
    );
    const newPosts = await res.json();
    setPosts((post) => [...post, ...newPosts]);
  };

  useEffect(() => {
    if (posts.length === JSON.parse(len)) {
      setHasMore(false);
    }
  }, [len, posts, setHasMore]);

  return (
    <Container>
      <InfiniteScroll
        dataLength={posts.length}
        next={getMorePost}
        hasMore={hasMore}
        loader={spinner()}
        endMessage={<h4>Nothing more to show</h4>}
      >
        {posts.map((data) => (
          <div key={data.id}>{pagination(data)}</div>
        ))}
      </InfiniteScroll>
    </Container>
  );
};

export default Pagination;
