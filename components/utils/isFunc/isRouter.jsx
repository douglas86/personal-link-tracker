import Dashboard from "../../../pages/dashboard";
import Create from "../../../pages/user/link/create";

export let isRouter;
isRouter = [
  {
    url: "/dashboard",
    displayedName: "Dashboard",
    protect: true,
  },
  {
    url: "/user/link/create",
    displayedName: "Create",
  },
];
