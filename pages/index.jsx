import { useContext, useEffect } from "react";

import CategoryCards from "../components/UI/organism/CategoryCards";
import { title } from "../components/UI/atom/title";
import { spinner } from "../components/UI/atom/spinner";

import useFetch from "../hooks/useFetch";

import { Context } from "../Context/Store";

const Home = () => {
  const { data } = useFetch("/api/category");
  const [state, dispatch] = useContext(Context);

  useEffect(() => {
    if (data) {
      dispatch({ type: "data", data: data[0] });
    }
  }, [data, dispatch]);

  return (
    <div>
      {title("Browse Tutorial/Courses")}
      {data ? <CategoryCards /> : spinner()}
    </div>
  );
};

export default Home;
