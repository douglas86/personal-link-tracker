import { Navbar, Container, Nav } from "react-bootstrap";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";

import { button } from "../atom/button";

import HomeLogo from "../../assets/home.jpeg";

import { toLink } from "../../utils/toFunc/toLink";
import { toImage } from "../../utils/toFunc/toImage";
import { isRouter } from "../../utils/isFunc/isRouter";

const Header = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const path = router.pathname;

  return (
    <>
      <Navbar bg="light" variant="light">
        <Container>
          {toLink("/", <a>{toImage(HomeLogo, 30, 30)}</a>)}
          <Nav className="ml-auto">
            {isRouter.map(({ url, displayedName, protect }, index) => (
              <div key={index}>
                {path !== url ? (
                  <>
                    {protect && session
                      ? toLink(url, <Nav.Link>{displayedName}</Nav.Link>)
                      : null}{" "}
                    {!protect &&
                      toLink(url, <Nav.Link>{displayedName}</Nav.Link>)}
                  </>
                ) : null}
              </div>
            ))}
          </Nav>
          {!session
            ? button("outline-primary", "SignIn", () => signIn())
            : button("outline-success", "SignOut", () =>
                signOut({
                  callbackUrl: `${window.location.origin}/`,
                })
              )}
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
