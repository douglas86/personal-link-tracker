import { Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import { useSession } from "next-auth/react";

const Create = () => {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm();

  const { data: session } = useSession();

  const onSubmit = async (data) => {
    console.log("data", data);
  };

  const handleLinkForm = () => (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Control
        {...register("title", { required: "This field is required" })}
        type="text"
        placeholder="Title"
      />
      <p style={{ color: "red", marginTop: "5px" }}>
        {errors.title ? errors.title.message : null}
      </p>
      <Form.Control
        {...register("url", { required: "This field is required" })}
        type="text"
        placeholder="URL"
      />
      <p style={{ color: "red", marginTop: "5px" }}>
        {errors.url ? errors.url.message : null}
      </p>
      <Button
        style={{ marginTop: "5px" }}
        type="submit"
        variant="outline-warning"
        disabled={!session ? true : false}
      >
        {session ? "Post" : "Login to Post"}
      </Button>
    </Form>
  );

  return (
    <div>
      <Container>
        <h1>Submit Link/URL</h1>
        <div>{handleLinkForm()}</div>
      </Container>
    </div>
  );
};

export default Create;
