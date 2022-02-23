import { useState, useEffect, useContext } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Resizer from "react-image-file-resizer";

import { ContextAdmin } from "./Context";

const CreateCategory = () => {
  const [image, setImage] = useState("");
  const context = useContext(ContextAdmin);
  const { inputs, setInputs, isRole, setIsRole, state, setState } = context;
  const { showAlert, alertColor } = state;

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm();

  useEffect(() => {
    if (showAlert) {
      setTimeout(() => {
        setState({ ...state, showAlert: false, buttonText: "Submit" });
      }, 10000);
    }
  }, [showAlert, state, setState]);

  const handleImage = (event) => {
    let fileInput = false;
    if (event.target.files[0]) {
      fileInput = true;
    }
    if (fileInput) {
      try {
        Resizer.imageFileResizer(
          event.target.files[0],
          300,
          300,
          "JPEG",
          100,
          0,
          (uri) => {
            setImage(uri);
          },
          "base64",
          200,
          200
        );
      } catch (err) {
        setState({
          ...state,
          message: result.message,
          showAlert: true,
          alertColor: "danger",
        });
      }
    }
  };

  const onSubmit = async (data) => {
    const { title, description } = data;
    const handleSubmission = { title, description, image };
    await fetch("/api/AWS/s3", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(handleSubmission),
    }).then(async (res) => {
      let result = await res.json();
      setState({
        ...state,
        message: result.message,
        showAlert: true,
        alertColor: "success",
      });
    });
    reset();
  };

  const createForm = () => (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Control
        {...register("title", { required: "this field is required" })}
        type="text"
        placeholder="Title"
      />
      <Form.Control
        {...register("description", { required: "this field is required" })}
        type="text"
        placeholder="description"
      />
      <Form.Control type="file" onChange={handleImage} />
      <Button
        style={{ marginTop: "5px" }}
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
          style={{ marginTop: "10px" }}
          variant="outline-info"
          size="lg"
          onClick={() => setIsRole("Admin")}
        >
          Admin Dashboard
        </Button>
        {state.showAlert && state.message ? (
          <Alert
            style={{ marginTop: "5px" }}
            variant={alertColor}
            onClose={() => setState({ ...state, showAlert: false })}
            dismissible
          >
            <Alert.Heading>{state.message}</Alert.Heading>
          </Alert>
        ) : null}
        <h1 className="h1">Create a category</h1>
        <div>{createForm()}</div>
      </Container>
    </>
  );
};

export default CreateCategory;
