import Router from "next/router";

import { isPosting } from "../isFunc/isPosting";

export const onSubmit = async (checks, state, formData, dispatch) => {
  const { category, types, medium } = state;
  const body = { category, types, medium, formData };

  if (checks) {
    isPosting("/api/link", body, dispatch);
    await Router.push("/");
  } else {
    alert("category, types or medium was not filled in correctly");
  }
};
