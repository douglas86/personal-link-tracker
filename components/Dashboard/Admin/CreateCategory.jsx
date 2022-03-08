import { useEffect, useContext } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

import { ContextAdmin } from './Context';
import Handler from './helpers/CreateCategoryHelper';

const CreateCategory = () => {
  const context = useContext(ContextAdmin);
  const { setIsRole, state, setState } = context;
  const { message, showAlert, alertColor } = state;
  const { handleImage, handleSubmission } = Handler();

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm();

  useEffect(() => {
    if (showAlert) {
      setTimeout(() => {
        setState({ ...state, showAlert: false, buttonText: 'Submit' });
      }, 10000);
    }
  }, [showAlert, state, setState]);

  const onSubmit = async (data) => {
    handleSubmission(data);
    reset();
  };

  const handleForm = () => (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Control
        {...register('title', { required: 'This field is required' })}
        type="text"
        placeholder="Title"
      />
      <p style={{ color: 'red', marginTop: '5px' }}>
        {errors.title ? errors.title.message : null}
      </p>
      <Form.Control
        {...register('description', { required: 'This field is required' })}
        type="text"
        placeholder="description"
      />
      <p style={{ color: 'red', marginTop: '5px' }}>
        {errors.description ? errors.description.message : null}
      </p>
      <Form.Control
        {...register('file', { required: 'This field is required' })}
        type="file"
        onChange={handleImage}
      />
      <p style={{ color: 'red', marginTop: '5px' }}>
        {errors.file ? errors.file.message : null}
      </p>
      <Button
        style={{ marginTop: '5px' }}
        type="submit"
        variant="outline-warning"
      >
        Submit
      </Button>
    </Form>
  );

  return (
    <>
      <Container>
        <Button
          style={{ marginTop: '10px' }}
          variant="outline-info"
          size="lg"
          onClick={() => setIsRole('Admin')}
        >
          Admin Dashboard
        </Button>
        {showAlert && message ? (
          <Alert
            style={{ marginTop: '5px' }}
            variant={alertColor}
            onClose={() => setState({ ...state, showAlert: false })}
            dismissible
          >
            <Alert.Heading>{message}</Alert.Heading>
          </Alert>
        ) : null}
        <h1 className="h1">Create a category</h1>
        <div>{handleForm()}</div>
      </Container>
    </>
  );
};

export default CreateCategory;
