import { useState, useContext } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { ContextAdmin } from './Context';

const CreateCategory = () => {
    const comp = useContext(ContextAdmin);
    const [inputs, setInputs] = useState();

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
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control
                            type="email"
                            placeholder="Create a title for your category"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control
                            type="password"
                            placeholder="Create a short description for your category"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicFile">
                        <Form.Control type="file" />
                    </Form.Group>
                    <Button variant="outline-warning" type="submit">
                        Submit
                    </Button>
                </Form>
            </Container>
        </div>
    );
};

export default CreateCategory;
