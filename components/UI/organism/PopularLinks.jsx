import { useContext } from "react";
import { Context } from "../../../Context/Store";

const PopularLinks = () => {
  const [state, dispatch] = useContext(Context);

  console.log("state", state);

  return (
    <div>
      <h1>PopularLinks</h1>
    </div>
  );
};

export default PopularLinks;
