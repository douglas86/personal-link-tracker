import { useState, useContext, useEffect } from 'react';
import { Alert, Button, Container, Form } from 'react-bootstrap';
import { ContextAdmin } from './Context';

const CreateCategory = () => {
    const context = useContext(ContextAdmin);
    const [inputs, setInputs] = useState({
        name: '',
        description: '',
        image: '',
    });

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setInputs({ ...inputs, image: base64 });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (inputs.name && inputs.description && inputs.image) {
            fetch('/api/AWS/s3', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(inputs),
            })
                .then(async (res) => {
                    let result = await res.json();
                    context.setMessage(result.message);
                    context.setShowAlert(true);
                    context.setVariant('success');
                })
                .catch(async (err) => {
                    let error = await err.json();
                    context.setMessage(error.error);
                    context.setShowAlert(true);
                    context.setVariant('danger');
                });
        } else {
            context.setMessage('All fields are required');
            context.setShowAlert(true);
            context.setVariant('danger');
        }
    };

    useEffect(() => {
        if (context.showAlert) {
            setTimeout(() => {
                context.setShowAlert(false);
            }, 10000);
        }
    }, [context]);

    return (
        <div>
            <Container>
                <Button
                    variant="outline-info"
                    size="lg"
                    onClick={() => context.setIsComponent('Admin')}
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
                                setInputs({
                                    ...inputs,
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
                                setInputs({
                                    ...inputs,
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
                            handleSubmit(e);
                        }}
                    >
                        Submit
                    </Button>
                </Form>
            </Container>
        </div>
    );
};

export default CreateCategory;
