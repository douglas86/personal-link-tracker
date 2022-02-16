import { useState, useContext, useEffect } from 'react';
import { Alert, Button, Container, Form } from 'react-bootstrap';
import { ContextAdmin } from './Context';
import Helpers from './helpers/CreateCategoryHelper';

const CreateCategory = () => {
    const context = useContext(ContextAdmin);

    const { isRole, setIsRole, showAlert, setShowAlert, state, setState } =
        context;

    const { handleSubmit, handleFileUpload } = Helpers();

    useEffect(() => {
        if (showAlert) {
            setTimeout(() => {
                setShowAlert(false);
            }, 10000);
        }
    }, [showAlert, setShowAlert]);

    return (
        <div>
            <Container>
                <Button
                    variant="outline-info"
                    size="lg"
                    onClick={() => setIsRole('Admin')}
                >
                    Admin Dashboard
                </Button>
                <h3>Create a new Category here!!</h3>
                {context.showAlert ? (
                    <Alert
                        variant={context.variant}
                        onClose={() => context.setShowAlert(false)}
                        dismissible
                    >
                        <Alert.Heading>{context.message}</Alert.Heading>
                    </Alert>
                ) : null}
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control
                            type="text"
                            onChange={(e) =>
                                context.setInputs({
                                    ...context.inputs,
                                    name: e.target.value,
                                })
                            }
                            placeholder="Create a title for your category"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control
                            type="text"
                            onChange={(e) =>
                                context.setInputs({
                                    ...context.inputs,
                                    description: e.target.value,
                                })
                            }
                            placeholder="Create a short description for your category"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicFile">
                        <Form.Control
                            type="file"
                            onChange={(e) => handleFileUpload(e)}
                        />
                    </Form.Group>
                    <Button
                        variant="outline-warning"
                        type="submit"
                        onClick={(e) => {
                            handleSubmit(e),
                                setState({
                                    ...state,
                                    buttonText: 'Submitting',
                                });
                        }}
                    >
                        {state.buttonText}
                    </Button>
                </Form>
            </Container>
        </div>
    );
};

export default CreateCategory;
