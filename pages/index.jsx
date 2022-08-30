import { useContext, useEffect } from "react";

import CategoryCards from "../components/UI/organism/CategoryCards";
import { title } from "../components/UI/atom/title";
import { spinner } from "../components/UI/atom/spinner";
import { alert } from "../components/UI/atom/alert";

import useFetch from "../hooks/useFetch";

import { Context } from "../Context/Store";

const Home = () => {
  const { data } = useFetch("/api/category");
  const [state, dispatch] = useContext(Context);

  useEffect(() => {
    if (data) {
      dispatch({ type: "data", data });
    }
    if (state[0] !== {} && state[0] !== undefined && state[0].alert !== "") {
      setTimeout(() => dispatch({ type: "reset_alert" }), 5000);
    }
  }, [data, dispatch]);

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
