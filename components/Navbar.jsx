import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';

const NavBar = () => {
    const { data: session } = useSession();

    return (
        <>
            <Navbar bg="light" variant="light">
                <Container>
                    <Link href="#nav" passHref>
                        <Navbar.Brand>Home</Navbar.Brand>
                    </Link>
                    <Nav className="me-auto">
                        <Link href="#dashboard" passHref>
                            <Nav.Link>Dashboard</Nav.Link>
                        </Link>
                        <Link href="#home" passHref>
                            <Nav.Link>Dashboard</Nav.Link>
                        </Link>
                    </Nav>
                    {session ? (
                        <Button
                            className="justify-content-right"
                            variant="outline-success"
                            onClick={() => signOut()}
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
