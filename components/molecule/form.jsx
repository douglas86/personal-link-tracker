import { submitButton } from "../atom/button";
import { input } from "../atom/input";
import { formErrors } from "../atom/formErrors";
import { formQuill } from "../atom/formQuill";

export const form = (
  setTitle,
  register,
  name,
  handleSubmit,
  errors,
  quillRef
) => (
  <>
    {input("text", { width: "100%" }, setTitle)}
    {formErrors(errors.title, "Enter valid title")}
    {formQuill(quillRef)}
    {formErrors(errors.description, "Enter valid description")}
    {submitButton(handleSubmit, "Create", "btn btn-outline-warning")}
  </>
);
