import { input } from "../atom/input";
import { formErrors } from "../atom/formErrors";

export const form = (setTitle, register, name, errors) => (
  <>
    {input("text", { width: "100%" }, setTitle, "Title")}
    {formErrors(errors.title, "Enter valid title")}
    {formErrors(errors.description, "Enter valid description")}
  </>
);

export const registerHookForm = (arr, register) => {
  arr.map((items) => {
    register(items, { required: true });
  });
};
