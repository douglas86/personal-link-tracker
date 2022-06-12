import { input } from "../atom/input";
import { formErrors } from "../atom/formErrors";
import { formQuill } from "../atom/formQuill";

export const form = (setTitle, register, name, errors, quillRef) => (
  <>
    {input("text", { width: "100%" }, setTitle, "Title")}
    {formErrors(errors.title, "Enter valid title")}
    {formQuill(quillRef)}
    {formErrors(errors.description, "Enter valid description")}
  </>
);

export const reg = (arr, register) => {
  arr.map((items) => {
    register(items, { required: true });
  });
};
