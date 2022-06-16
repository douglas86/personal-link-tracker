import Link from "next/link";
import { Nav } from "react-bootstrap";

import { sign_in, sign_out } from "../atom/button2";
import { img } from "../atom/image";
import { links } from "../atom/links";

import HomeLogo from "../../public/static/Images/home.jpeg";

export const authButtons = (session, signIn, signOut) => {
  return <>{session ? sign_out(signOut) : sign_in(signIn)}</>;
};

export const navbarLinks = (session, url) => {
  return (
    <>
      {session !== undefined && url !== "/dashboard"
        ? links("/dashboard", <Nav.Link>Dashboard</Nav.Link>)
        : null}
      {url !== "/user/link/create"
        ? links("/user/link/create", <Nav.Link>Submit a Link</Nav.Link>)
        : null}
    </>
  );
};

export const homeImageLink = () => {
  return (
    <>
      <Link href="/" passHref>
        <a onClick={() => router.reload(window.location.pathname)}>
          {img(HomeLogo, 30, 30)}
        </a>
      </Link>
    </>
  );
};
