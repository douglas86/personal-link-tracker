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

export const submitButton = (handleSubmit, Name, variant) => {
    return (
        <div className="form-group" style={{ padding: '10px' }}>
            <Button
                className="justify-content-right"
                variant={variant}
                onClick={handleSubmit}
            >
                {Name}
            </Button>
        </div>
    );
};

export const RadioButton = ({ value, checked, onChange }) => (
    <>
        <input
            type="radio"
            onChange={onChange}
            name="radio"
            defaultChecked={checked}
        />
    </>
);
