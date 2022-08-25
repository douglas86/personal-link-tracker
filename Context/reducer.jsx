import { homeReducer } from "./home/homeReducer";

export const isReducer = [
  {
    path: "/",
    reducer: homeReducer,
  },
];
