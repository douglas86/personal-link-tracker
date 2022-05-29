import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

import { Nav } from 'react-bootstrap';

import { navbarLinks, authButtons, homeImageLink } from '../molecule/navbar';

const NavBar = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const url = router.pathname;

    return (
        <>
            {homeImageLink()}
            <Nav className="ml-auto">{navbarLinks(session, url)}</Nav>
            {authButtons(session, signIn, signOut)}
        </>
    );
};

export default NavBar;
