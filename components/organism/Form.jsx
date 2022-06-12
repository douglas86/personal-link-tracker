import "quill/dist/quill.snow.css";
import { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useQuill } from "react-quilljs";
import { useForm } from "react-hook-form";
import { form } from "../molecule/form";
import { AdminContext } from "../../Context/AdminContext";
import ImageUploading from "react-images-uploading";

import { formErrors } from "../atom/formErrors";
import { submitButton } from "../atom/button";
import { img } from "../atom/image";
import Api from "../../API";

const Form = () => {
  const { content, setIsTab } = useContext(AdminContext);
  const [images, setImages] = useState("");
  const { quill, quillRef } = useQuill();
  const [title, setTitle] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { Posting } = Api();

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
    register("title", { required: true });
    register("description", { required: true });
    register("image", { required: true });
  }, [title, quill, quillRef, register, setValue, content]);

  const onSubmit = (data) => {
    setIsTab("all");
    Posting("/api/category", data);
  };

  return (
    <Container>
      {form(setTitle, register, "title", errors, quillRef)}
      <div className="image-uploaded">
        <ImageUploading
          multiple
          value={images}
          onChange={onChange}
          maxNumber="1"
          dataURLKey="data_url"
        >
          {({ onImageUpdate, isDragging, dragProps }) => (
            <div className="upload_image-wrapper">
              <button
                style={{
                  width: "100%",
                  height: "14.5rem",
                  textAlign: "center",
                  fontSize: "8rem",
                  color: isDragging ? "red" : "black",
                  border: isDragging ? "5px red solid" : "1px black solid",
                }}
                onClick={() => onImageUpdate}
                {...dragProps}
              >
                {images === "" ? "+" : img(images, 200, 100)}
              </button>
            </div>
          )}
        </ImageUploading>
      </div>
      {formErrors(errors.image, "No image selected")}
      {submitButton(
        handleSubmit(onSubmit),
        "Create",
        "btn btn-outline-warning"
      )}
    </Container>
  );
};

export default Form;
