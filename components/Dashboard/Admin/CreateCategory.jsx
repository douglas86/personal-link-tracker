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

    console.log('errors', errors);
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
                                required: 'This is required',
                            })}
                            placeholder="Create a title for your category"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control
                            type="text"
                            {...register('description', {
                                required: 'This is required',
                                minLength: {
                                    value: 2,
                                    message:
                                        'You have entered to few characters',
                                },
                            })}
                            placeholder="Write descriptions here"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicFile">
                        <Form.Control
                            type="file"
                            {...register('image', {
                                required: 'this field is required',
                            })}
                        />
                    </Form.Group>
                    <Button type="submit" variant="outline-warning">
                        Submit
                    </Button>
                </Form>
            </Container>
        </div>
    );
};

{
    /* <form
    onSubmit={handleSubmit((data) => {
        console.log('data', data);
    })}
>
    <input
        {...register('firstName', {
            required: 'This is required',
        })}
        placeholder="First Name"
    />
    <p>{errors.firstName?.message}</p>
    <input
        {...register('lastName', {
            required: 'This is required',
            minLength: { value: 4, message: 'Min length is 4' },
        })}
        placeholder="Last Name"
    />
    <p>{errors.lastName?.message}</p>
    <input type="submit" onClick={() => reset()} />
</form>; */
}

{
    /* <Form>
    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control
            type="text"
            onChange={(e) =>
                setInputs({
                    ...inputs,
                    name: e.target.value,
                })
            }
            value={inputs.name}
            placeholder="Create a title for your category"
        />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control
            type="text"
            onChange={(e) =>
                setInputs({
                    ...inputs,
                    description: e.target.value,
                })
            }
            placeholder="Create a short description for your category"
        />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicFile">
        <Form.Control type="file" onChange={(e) => handleFileUpload(e)} />
    </Form.Group>
    <Button
        variant="outline-warning"
        type="submit"
        onClick={(e) => {
            handleSubmit(e);
            setState({
                ...state,
                buttonText: 'Submitting',
                showAlert: true,
            }),
                this.reset();
        }}
    >
        {state.buttonText}
    </Button>
</Form>; */
}

export default CreateCategory;
