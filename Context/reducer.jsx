import { homeReducer } from "./home/homeReducer";
import { linkReducer } from "./create/linkReducer";
import { slugReducer } from "./slug/slugReducer";

export const isReducer = [
  {
    path: "/",
    reducer: homeReducer,
  },
  {
    path: "/user/link/create",
    reducer: linkReducer,
  },
  {
    path: "/links/[slug]",
    reducer: slugReducer,
  },
];
