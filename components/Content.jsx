import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const Content = ({ data, len }) => {
  const [posts, setPosts] = useState(JSON.parse(data));
  const [hasMore, setHasMore] = useState(true);

  const getMorePost = async () => {
    const res = await fetch(`/api/pagination?_start=${posts.length}&_limit=2`);
    const newPosts = await res.json();
    setPosts((post) => [...post, ...newPosts]);
  };

  useEffect(() => {
    if (posts.length === JSON.parse(len)) {
      setHasMore(false);
    }
  }, [len, posts, setHasMore]);

  return (
    <>
      <InfiniteScroll
        dataLength={posts.length}
        next={getMorePost}
        hasMore={hasMore}
        loader={
          <div key={0}>
            <h3>Loading ...</h3>
          </div>
        }
        endMessage={<h4>Nothing more to show</h4>}
      >
        {posts.map((data) => (
          <div key={data.id} style={{ marginBottom: "500px" }}>
            <strong> {data.id}</strong> {data.title}
            {data.completed}
          </div>
        ))}
      </InfiniteScroll>
    </>
  );
};

export default Content;
