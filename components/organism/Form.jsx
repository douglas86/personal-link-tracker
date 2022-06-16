import "quill/dist/quill.snow.css";

import { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useQuill } from "react-quilljs";
import { useForm } from "react-hook-form";

import { AdminContext } from "../../Context/AdminContext";

import { formErrors } from "../atom/formErrors";
import { submitButton } from "../atom/button";
import { form, registerHookForm } from "../molecule/form";

import Handler from "./Handler";
import { imageUpload } from "../molecule/imageUpload";

const Form = () => {
  const { content, isTab } = useContext(AdminContext);
  const { quill, quillRef } = useQuill();
  const [title, setTitle] = useState("");
  const [images, setImages] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { onSubmit } = Handler();

  const onChange = (imageList) => {
    const { data_url } = imageList[0];
    setImages(data_url);
    setValue("image", data_url);
  };

  useEffect(() => {
    if (quill) {
      if (content !== "") {
        quill.clipboard.dangerouslyPasteHTML(`${content}`);
      }
      quill.on("text-change", () => {
        setValue("description", quillRef.current.firstChild.innerHTML);
      });
    }
    setValue("title", title);
    registerHookForm(["title", "description", "image"], register);
  }, [title, quill, quillRef, register, setValue, content]);

  return (
    <Container>
      {form(setTitle, register, "title", errors, quillRef)}
      <div className="image-uploaded">{imageUpload(images, onChange)}</div>
      {formErrors(errors.image, "No image selected")}
      {submitButton(
        handleSubmit(onSubmit),
        isTab === "create" ? "Create" : "Update",
        isTab === "update"
          ? "btn btn-outline-success"
          : "btn btn-outline-warning"
      )}
    </Container>
  );
};

export default Form;
