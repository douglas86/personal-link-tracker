import { GetRoute } from "../../API";
import { spinner } from "../atom/spinner";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Auth = ({ children }) => {
  const { data: session } = useSession();
  const fetcher = GetRoute("/api/user2");
  const router = useRouter().pathname.split("/");

  const [admin, setAdmin] = useState(false);
  const [user, setUser] = useState(false);

  console.log("fetcher", fetcher);
  console.log("session", session);
  console.log("router", router);

  useEffect(() => {
    if (fetcher.data) {
      if (fetcher.data[0].role === "admin" && session) {
        setAdmin(true);
      } else if (fetcher.data[0].role === "user" && session) {
        setUser(true);
      } else {
        return <h1>You are not logged in or authorised</h1>;
      }
    }
  }, [children, fetcher, router, session]);

  return (
    <>
      {fetcher.data ? (
        admin ? (
          children
        ) : user === router[1] ? (
          children
        ) : (
          <h1>You are not authorized</h1>
        )
      ) : (
        spinner()
      )}
    </>
  );
};

export default Auth;
