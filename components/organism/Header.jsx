import { Navbar, Container } from 'react-bootstrap';

import NavBar from './NavBar';

const Header = () => {
    return (
        <>
            <Navbar bg="light" variant="light">
                <Container>
                    <NavBar />
                </Container>
            </Navbar>
        </>
    );
};

export default Header;
