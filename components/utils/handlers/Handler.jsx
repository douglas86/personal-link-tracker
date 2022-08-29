import { useContext } from "react";

import { checkbox } from "./checkbox";

import { Context } from "../../../Context/Store";
import { radio } from "./radio";

const Handler = () => {
  const [state, dispatch] = useContext(Context);

  const handleCheckbox = (event, title) => checkbox(event, title, dispatch);
  const handleRadio = (title, name) => radio(title, name, dispatch);

  return {
    handleCheckbox,
    handleRadio,
  };
};

export default Handler;
