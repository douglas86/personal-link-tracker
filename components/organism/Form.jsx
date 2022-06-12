import "quill/dist/quill.snow.css";
import { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useQuill } from "react-quilljs";
import { useForm } from "react-hook-form";
import { form } from "../molecule/form";
import { AdminContext } from "../../Context/AdminContext";

const Form = () => {
  const { content } = useContext(AdminContext);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { quill, quillRef } = useQuill();
  const [title, setTitle] = useState("");

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
    register("title", { required: true });
    register("description", { required: true });
  }, [title, quill, quillRef, register, setValue, content]);

  const onSubmit = (data) => console.log("data", data);

  console.log("err", errors);
  console.log("title", title);

  return (
    <Container>
      {form(
        setTitle,
        register,
        "title",
        handleSubmit(onSubmit),
        errors,
        quillRef
      )}
    </Container>
  );
};

export default Form;
