import "quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useQuill } from "react-quilljs";

import { useForm } from "react-hook-form";

const Form = () => {
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
      // if (content !== "") {
      //   quill.clipboard.dangerouslyPasteHTML(`${content}`);
      // }
      quill.on("text-change", () => {
        setValue("description", quillRef.current.firstChild.innerHTML);
      });
    }
    register("description", { required: true, minLength: 11 });
  }, [quill, quillRef, register, setValue]);

  const onSubmit = (data) => console.log("data", data);

  console.log("err", errors);
  console.log("title", title);

  return (
    <Container>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        {...register("title", { required: true })}
      />
      <p>{errors.title && "Enter valid title"}</p>
      <div ref={quillRef} />
      <p className="Error">{errors.description && "Enter valid content"}</p>
      <input type="submit" onClick={handleSubmit(onSubmit)} />
    </Container>
  );
};

export default Form;
