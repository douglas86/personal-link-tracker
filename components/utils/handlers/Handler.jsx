import { useContext } from "react";

import { checkbox } from "./checkbox";
import { radio } from "./radio";
import { onSubmit } from "./onSubmit";

import { Context } from "../../../Context/Store";

const Handler = () => {
  const [state, dispatch] = useContext(Context);

  const category = state[0].category;
  const medium = state[0].medium;
  const types = state[0].types;

  const checks =
    state[0].category !== undefined
      ? category.length !== 0 && medium !== "" && types !== ""
      : false;

  const handleCheckbox = (event, title) => checkbox(event, title, dispatch);
  const handleRadio = (title, name) => radio(title, name, dispatch);
  const handleOnSubmit = (formData) =>
    onSubmit(checks, state[0], formData, dispatch);

  return {
    handleCheckbox,
    handleRadio,
    handleOnSubmit,
  };
};

export default Handler;
