import { useSession, signIn, signOut } from 'next-auth/react';

import { authButtons } from '../molecule/navbar';

const NavBar = () => {
    const { data: session } = useSession();
    return <>{authButtons(session, signIn, signOut)}</>;
};

export default NavBar;
