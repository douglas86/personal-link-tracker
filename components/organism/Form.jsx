import "quill/dist/quill.snow.css";
import { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useQuill } from "react-quilljs";
import { useForm } from "react-hook-form";
import { form } from "../molecule/form";
import { AdminContext } from "../../Context/AdminContext";
import ImageUploading from "react-images-uploading";

import { formErrors } from "../atom/formErrors";

const Form = () => {
  const { content } = useContext(AdminContext);
  const [images, setImages] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { quill, quillRef } = useQuill();
  const [title, setTitle] = useState("");

  const onChange = (imageList, addUpdateIndex) => {
    console.log("imageList", imageList, addUpdateIndex);
    setImages(imageList);
    const { data_url } = imageList[0];
    setValue("image", data_url);
  };

  // console.log("images", images[0].data_url);
  console.log("err", errors);

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
    console.log("data", data);
  };

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
                +
              </button>
            </div>
          )}
        </ImageUploading>
      </div>
      {formErrors(errors.image, "No image selected")}
    </Container>
  );
};

// <div className="app">
//   <ImageUploading
//       multiple
//       value={images}
//       onChange={onChange}
//       maxNumber={maxNumber}
//       dataURLKey="data_url"
//   >
//     {({
//         imageList,
//         onImageUpload,
//         onImageRemoveAll,
//         onImageUpdate,
//         onImageRemove,
//         isDragging,
//         dragProps,
//       }) => (
//         <div className="upload_image-wrapper">
//           <button
//               style={isDragging ? { color: "red" } : undefined}
//               onClick={onImageUpdate}
//               {...dragProps}
//           >
//             Click or Drop here
//           </button>
//           &nbsp;
//           <button onClick={onImageRemoveAll}>Remove all images</button>
//           {imageList.map((image, index) => (
//               <div key={index} className="image-item">
//                 <img src={image["data_url"]} alt="" width="100" />
//                 <div className="image-item_btn-wrapper">
//                   <button onClick={() => onImageUpdate(index)}>Update</button>
//                   <button onClick={() => onImageRemove(index)}>Remove</button>
//                 </div>
//               </div>
//           ))}
//         </div>
//     )}
//   </ImageUploading>
// </div>

export default Form;
