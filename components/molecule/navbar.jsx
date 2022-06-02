import Link from 'next/link';
import { Nav } from 'react-bootstrap';

import { signin, signout } from '../atom/button';
import { image } from '../atom/image';
import { links } from '../atom/links';

import HomeLogo from '../../public/static/Images/home.jpeg';

export const authButtons = (session, signIn, signOut) => {
    return <>{session ? signout(signOut) : signin(signIn)}</>;
};

export const navbarLinks = (session, url) => {
    return (
        <>
            {session !== undefined && url !== '/dashboard'
                ? links('/dashboard', <Nav.Link>Dashboard</Nav.Link>)
                : null}
            {url !== '/user/link/create'
                ? links('/user/link/create', <Nav.Link>Submit a Link</Nav.Link>)
                : null}
        </>
    );
};

export const homeImageLink = () => {
    return (
        <>
            <Link href="/" passHref>
                <a onClick={() => router.reload(window.location.pathname)}>
                    {image(HomeLogo, 30, 30)}
                </a>
            </Link>
        </>
    );
};
