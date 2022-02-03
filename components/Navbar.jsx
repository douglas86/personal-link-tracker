import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import Link from 'next/link';

const NavBar = () => {
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
                        <Button className="justify-content-right" variant="outline-success">
                            Sign In
                        </Button>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
};

export default NavBar;
