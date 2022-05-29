import { signin, signout } from '../atom/button';

export const authButtons = (session, signIn, signOut) => {
    return <>{session ? signout(signOut) : signin(signIn)}</>;
};
