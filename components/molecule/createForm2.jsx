import { input } from "../atom/input2";
import { formErrors } from "../atom/formErrors2";
import { formQuill } from "../atom/formQuill2";
import { submitButton } from "../atom/button2";
import { imageUpload } from "./imageUpload";

export const createForm2 = (
  inputType,
  inputState,
  inputPlaceholder,
  errorTitle,
  errorDescription,
  errorImage,
  quill,
  images,
  onChange,
  handleSubmit
) => (
  <>
    {input(inputType, { width: "100%" }, inputState, inputPlaceholder)}
    {formErrors(errorTitle, "This field is required")}
    {formQuill(quill)}
    {formErrors(errorDescription, "This field is required")}
    <div className="image-uploaded">{imageUpload(images, onChange)}</div>
    {formErrors(errorImage, "No image selected")}
    {submitButton(handleSubmit, "Create", "btn btn-outline-warning")}
  </>
);
