import { Alert } from 'react-bootstrap';

export const displayAlert = (color, message) => {
    return (
        <>
            <Alert variant={color}>
                <Alert.Heading>{message}</Alert.Heading>
            </Alert>
        </>
    );
};
