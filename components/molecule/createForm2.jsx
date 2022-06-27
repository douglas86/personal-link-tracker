import { input } from "../atom/input";
import { formErrors } from "../atom/formErrors";
import { submitButton } from "../atom/button";
import { imageUpload } from "../atom/imageUpload";

export const createForm2 = (
  state,
  setState,
  images,
  errors,
  onChange,
  handleSubmit
) => (
  <>
    {formErrors(errors.id, "id not in field")}
    {input("text", "title", state, setState, "Title")}
    {formErrors(errors.title, "This field is required")}
    {input("text", "description", state, setState, "Description")}
    {formErrors(errors.description, "This field is required")}
    <div className="image-uploaded" style={{ width: "100%", margin: "2% 1%" }}>
      {imageUpload(images, onChange)}
    </div>
    {formErrors(errors.image, "No image selected")}
    {submitButton(handleSubmit, "Create", "btn btn-outline-warning")}
  </>
);
