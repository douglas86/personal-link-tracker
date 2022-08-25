import { createContext, useEffect, useReducer } from "react";
import { useRouter } from "next/router";

import { isReducer } from "./reducer";

const initialState = {};
let location;

export const reducer = (state, action) =>
  isReducer
    .map(({ path, reducer }) => path === location && reducer(state, action))
    .filter((items) => items);

export const Context = createContext(initialState);

export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = reducer.length !== 0 ? [state, dispatch] : null;
  location = useRouter().pathname;

  useEffect(() => {
    dispatch({ type: "reset" });
  }, []);

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
