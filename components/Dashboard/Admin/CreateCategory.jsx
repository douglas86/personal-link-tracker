import { useContext } from 'react';
import { Button, Container } from 'react-bootstrap';
import { ContextAdmin } from './Context';

const CreateCategory = () => {
    const comp = useContext(ContextAdmin);

    return (
        <div>
            <Container>
                <Button
                    variant="outline-info"
                    size="lg"
                    onClick={() => comp.setIsComponent('Admin')}
                >
                    Admin Dashboard
                </Button>
                <h3>Create a new Category here!!</h3>
            </Container>
        </div>
    );
};

export default CreateCategory;
