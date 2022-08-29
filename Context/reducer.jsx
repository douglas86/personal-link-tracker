import { homeReducer } from "./home/homeReducer";
import { linkReducer } from "./link/linkReducer";

export const isReducer = [
  {
    path: "/",
    reducer: homeReducer,
  },
  {
    path: "/user/link/create",
    reducer: linkReducer,
  },
];
