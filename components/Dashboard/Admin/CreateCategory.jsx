import { useState, useContext, useEffect } from 'react';
import { Alert, Button, Container, Form } from 'react-bootstrap';
import { ContextAdmin } from './Context';
import Helpers from './helpers/CreateCategoryHelper';
import { useForm } from 'react-hook-form';

const CreateCategory = () => {
    const context = useContext(ContextAdmin);

    const { inputs, setInputs, isRole, setIsRole, state, setState } = context;
    const { showAlert } = state;

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const { handleSubmission, handleFileUpload } = Helpers();

    // useEffect(() => {
    //     if (showAlert) {
    //         setTimeout(() => {
    //             setState({ ...state, showAlert: false, buttonText: 'Submit' });
    //         }, 10000);
    //     }
    // }, [showAlert, state, setState]);

    const onSubmit = (data) => {
        // handleSubmission(data);
        // reset();
        // console.log('data', data.image);
        handleFileUpload(data.image);
    };

    console.log('e', errors);
    console.log('state', state);

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
                {state.showAlert && state.success ? (
                    <Alert
                        variant={context.variant}
                        onClose={() => setState({ ...state, showAlert: false })}
                        dismissible
                    >
                        <Alert.Heading>{state.success}</Alert.Heading>
                    </Alert>
                ) : null}
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control
                            type="text"
                            {...register('name', {
                                required: 'This field is required',
                            })}
                            placeholder="Create a title for your category"
                        />
                        <p style={{ color: 'red', marginTop: '5px' }}>
                            {errors.name?.message}
                        </p>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control
                            type="text"
                            {...register('description', {
                                required: 'This field is required',
                                minLength: {
                                    value: 20,
                                    message:
                                        'You have entered to few characters',
                                },
                            })}
                            placeholder="Write descriptions here"
                        />
                        <p style={{ color: 'red', marginTop: '5px' }}>
                            {errors.description?.message}
                        </p>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicFile">
                        <Form.Control
                            type="file"
                            {...register('image', {
                                required: 'This field is required',
                            })}
                        />
                        <p style={{ color: 'red', marginTop: '5px' }}>
                            {errors.image?.message}
                        </p>
                    </Form.Group>
                    <Button type="submit" variant="outline-warning">
                        Submit
                    </Button>
                </Form>
            </Container>
        </div>
    );
};

export default CreateCategory;
