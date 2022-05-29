import { Button } from 'react-bootstrap';

export const signin = (signIn) => {
    return (
        <Button
            className="justify-content-right"
            variant="outline-primary"
            onClick={() => signIn()}
        >
            Sign In
        </Button>
    );
};

export const signout = (signOut) => {
    return (
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
    );
};
