import { GetRoute } from "../API";
import { spinner } from "../components/atom/spinner";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { withAdmin } from "../components/organism/RoleInOrganisation/withAdmin";
import { withUser } from "../components/organism/RoleInOrganisation/withUser";

const Auth = ({ children }) => {
  const { data: session } = useSession();
  const fetcher = GetRoute("/api/user");
  const router = useRouter().pathname.split("/");

  const Role = () => {
    switch (router[1]) {
      case "admin":
        return withAdmin(router[1], fetcher.data[0].role, session) ? (
          children
        ) : (
          <h1>You are not authorized</h1>
        );
      case "user":
        return withUser(router[1], fetcher.data[0].role, session) ? (
          children
        ) : (
          <h1>You are not allowed on this Page</h1>
        );
      default:
        return children;
    }
  };

  return <>{fetcher.data ? Role() : spinner()}</>;
};

export default Auth;
