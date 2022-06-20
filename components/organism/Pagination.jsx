import { useEffect, useState } from "react";

import { pagination } from "../../API";
import InfinteScroll from "react-infinite-scroller";
import { spinner } from "../atom/spinner";
import { pag } from "../molecule/pag";

// Description of component
// takes in a name as a slug
// allLinks - this will gather all data of all the links in db
// myLinks - this is to gather all links based on logged-in user
// if slug is given as an argument - it will gather links based on category2 name

const Pagination = ({ slug }) => {
  const [skip, setSkip] = useState(0);
  const [link, setLink] = useState([]);
  const [len, setLen] = useState();

  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    setMounted(true);

    if (mounted) {
      pagination(`/api/pagination?slug=${slug}&skip=0`).then((items) => {
        setLink(items.data);
        setLen(items.len);
      });
    }

    return () => setMounted(false);
  }, [slug, mounted, setMounted]);

  const loadMore = async () => {
    let toSkip = skip + 2;
    pagination(`/api/pagination?slug=${slug}&skip=${skip}`).then((items) => {
      setLink([...link, ...items.data]);
      setSkip(toSkip);
    });
  };

  return (
    <InfinteScroll
      pageStart={0}
      loadMore={loadMore}
      hasMore={skip <= len}
      loader={<div key={0}>{spinner()}</div>}
    >
      {link
        ? link?.map((item, index) => <div key={index}>{pag(item)}</div>)
        : spinner()}
    </InfinteScroll>
  );
};

export default Pagination;
