import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Get } from './api';
import { useRouter } from 'next/router';

const NavBar = () => {
    const { data: session } = useSession();
    const router = useRouter();

    // This will call the api for creating or retieving logged in user
    Get('/api/auth/auth');

    return (
        <>
            <Navbar bg="light" variant="light">
                <Container>
                    {router.pathname !== '/' ? (
                        <Link href="/" passHref>
                            <Navbar.Brand>Home</Navbar.Brand>
                        </Link>
                    ) : null}
                    <Nav className="me-auto">
                        {session !== undefined &&
                        session !== null &&
                        router.pathname !== '/dashboard' ? (
                            <Link href="/dashboard" passHref>
                                <Nav.Link>Dashboard</Nav.Link>
                            </Link>
                        ) : null}
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
                            onClick={() =>
                                signIn('github', {
                                    callbackUrl: '/dashboard',
                                })
                            }
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
