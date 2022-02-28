import { useEffect, useState } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { AiFillDashboard } from "react-icons/ai";

import { useRouter } from "next/router";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

import { Get } from "./api";

// Images
import Home from "../public/Images/home.jpeg";

const NavBar = () => {
  // this shows and hides popup for mouse hover on home image
  const [isShownHome, setIsShownHome] = useState(false);
  const [isShownDashboard, setIsShownDashboard] = useState(false);

  const { data: session } = useSession();
  const router = useRouter();

  // This will call the api for creating or retieving logged in user
  // Get('/api/auth/auth');

  // as soon as current page url changed it sets isShown to false
  useEffect(() => {
    setIsShownHome(false);
    setIsShownDashboard(false);
  }, [router.pathname]);

  return (
    <>
      <Navbar bg="light" variant="light">
        <Container>
          {router.pathname !== "/" ? (
            <>
              <Link href="/" passHref>
                <a
                  onMouseEnter={() => setIsShownHome(true)}
                  onMouseLeave={() => setIsShownHome(false)}
                >
                  <Image src={Home} alt="home page" width={30} height={30} />
                </a>
              </Link>

              {isShownHome && <h4>Home Page</h4>}
            </>
          ) : null}
          <Nav className="me-auto">
            {session !== undefined &&
            session !== null &&
            router.pathname !== "/dashboard" ? (
              <>
                <Link href="/dashboard" passHref>
                  <Nav.Link>Dashboard</Nav.Link>
                </Link>
              </>
            ) : null}
          </Nav>
          {session ? (
            <Button
              className="justify-content-right"
              variant="outline-success"
              onClick={() =>
                signOut({
                  callbackUrl: `${window.location.origin}/dashboard`,
                })
              }
            >
              Sign Out
            </Button>
          ) : (
            <Button
              className="justify-content-right"
              variant="outline-primary"
              onClick={() => signIn()}
            >
              Sign In
            </Button>
          )}
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
