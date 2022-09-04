import { useContext } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useRouter } from "next/router";

import { mapToPagination } from "../molecule/mapToPagination";
import { spinner, img } from "../atom";

import logo from "../../assets/main.jpg";
import { getMore } from "../../../Helpers/components";

import { Context } from "../../../Context/Store";

const Pagination = () => {
  const [state, dispatch] = useContext(Context);
  const slug = useRouter().query.slug;
  const endpoint = `/api/link?slug=${slug}&skip=${state[0].data.length}&take=2`;

  const more = async () => await getMore(endpoint, state, dispatch);

  return (
    <div style={{ height: "700px", overflow: "auto" }}>
      <InfiniteScroll
        pageStart={0}
        loadMore={more}
        hasMore={state[0].data.length <= state[0].len - 2}
        loader={<div key={0}>{spinner()}</div>}
        useWindow={false}
      >
        {state[0].data.map((item) => (
          <div key={item.id}>{mapToPagination(item)}</div>
        ))}
      </InfiniteScroll>
      {state[0].data.length === state[0].len && (
        <div style={{ textAlign: "center", margin: "3%" }}>
          {img(logo, 200, 200)}
        </div>
      )}
    </div>
  );
};

export default Pagination;
