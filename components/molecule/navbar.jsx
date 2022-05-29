import Link from 'next/link';

import { signin, signout } from '../atom/button';
import { image } from '../atom/image';
import { dashboard_links, submit_links } from '../atom/navBarLinks';
import HomeLogo from '../../public/static/Images/home.jpeg';

export const authButtons = (session, signIn, signOut) => {
    return <>{session ? signout(signOut) : signin(signIn)}</>;
};

export const navbarLinks = (session, url) => {
    return (
        <>
            {session !== undefined && url !== '/dashboard'
                ? dashboard_links()
                : null}
            {url !== '/user/link/create' ? submit_links() : null}
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
