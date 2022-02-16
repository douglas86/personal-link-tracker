import { useState, useContext, useEffect } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { ContextAdmin } from './Context';

const CreateCategory = () => {
    const comp = useContext(ContextAdmin);
    const [inputs, setInputs] = useState({
        name: '',
        desciption: '',
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

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/api/AWS/s3', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(inputs),
        })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    };

    console.log('text', inputs);

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
                            type="text"
                            onChange={(e) =>
                                setInputs({
                                    ...inputs,
                                    description: e.target.value,
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
