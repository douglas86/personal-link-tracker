import { input } from "../atom/input2";
import { formErrors } from "../atom/formErrors2";
import { imageUpload } from "./imageUpload";
import { submitButton } from "../atom/button2";
import { Container } from "react-bootstrap";

export const updateForm2 = (
  state,
  setState,
  images,
  errors,
  onChange,
  handleSubmit,
  handleCancel
) => {
  const { title, description } = state;
  return (
    <>
      <div style={{ display: "flex" }}>
        <div style={{ width: "80%" }}>
          <Container>
            {input("text", "title", state, setState, "Title", title)}
            {formErrors(errors.title, "This field is required")}
            {input(
              "text",
              "description",
              state,
              setState,
              "Description",
              description
            )}
            {formErrors(errors.description, "This field is required")}
            <div
              className="image-uploaded"
              style={{ width: "100%", margin: "2% 1%" }}
            >
              {imageUpload(images, onChange)}
            </div>
            {formErrors(errors.image, "No image selected")}
            <div style={{ display: "flex" }}>
              {submitButton(handleSubmit, "Update", "btn btn-outline-success")}
              {submitButton(handleCancel, "Cancel", "btn btn-outline-danger")}
            </div>
          </Container>
        </div>
        <div style={{ width: "20%" }}>
          <Container>
            <h1>This is the right</h1>
          </Container>
        </div>
      </div>
    </>
  );
};
