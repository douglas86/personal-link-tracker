import { useContext, useEffect } from "react";

import CategoryCards from "../components/UI/organism/CategoryCards";
import { title, spinner, alert } from "../components/UI/atom";

import useFetch from "../hooks/useFetch";

import { Context } from "../Context/Store";

const Home = () => {
  const { data } = useFetch("/api/category");
  const [state, dispatch] = useContext(Context);

  useEffect(() => {
    if (data) {
      dispatch({ type: "reset", data });
    }
    if (state[0] !== {} && state[0] !== undefined && state[0].alert !== "") {
      setTimeout(() => dispatch({ type: "reset_alert" }), 5000);
    }
  }, [data]);

  return (
    <div>
      {data
        ? state[0] !== {} && state[0] !== undefined && state[0].alert !== ""
          ? alert("primary", state[0].alert)
          : null
        : null}
      {title("Browse Tutorial/Courses")}
      {data ? <CategoryCards /> : spinner()}
    </div>
  );
};

export default Home;
