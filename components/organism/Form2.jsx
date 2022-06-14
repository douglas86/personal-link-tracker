import { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import { AdminContext } from "../../Context/AdminContext";
import { useQuill } from "react-quilljs";
import { useForm } from "react-hook-form";
import { registerHookForm } from "../atom/registerHookForm2";
import { createForm2 } from "../molecule/createForm2";
import { updateForm2 } from "../molecule/updateForm2";
import Handler2 from "./Handler2";

const Form2 = () => {
  const { isTab } = useContext(AdminContext);
  const { quill, quillRef } = useQuill();
  const { onSubmit, handleUpdate } = Handler2();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (quill) {
      if (isTab === "update") {
        quill.clipboard.dangerouslyPasteHTML(`${content}`);
      }
      quill.on("text-change", () => {
        setValue("description", quillRef.current.firstChild.innerHTML);
      });
    }
    setValue("title", title);
    registerHookForm(["title", "description", "image"], register);
  }, [title, quill, quillRef, register, setValue, content, isTab]);

  console.log("isTab", isTab);

  const onChange = (imageList) => {
    const { data_url } = imageList[0];
    setImages(data_url);
    setValue("image", data_url);
  };

  const loadForm = () => {
    switch (isTab) {
      case "create":
        return createForm2(
          "text",
          setTitle,
          "Title",
          errors.title,
          errors.description,
          errors.image,
          quillRef,
          images,
          onChange,
          handleSubmit(onSubmit)
        );
      case "update":
        return updateForm2(
          "text",
          setTitle,
          "Title",
          errors.title,
          errors.description,
          errors.image,
          quillRef,
          images,
          onChange,
          handleSubmit(handleUpdate)
        );
      default:
        return (
          <>
            <h1>This is default</h1>
          </>
        );
    }
  };

  return <Container>{loadForm()}</Container>;
};

export default Form2;
