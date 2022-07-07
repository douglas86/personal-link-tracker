import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";

import { AdminContext } from "../../Context/AdminContext";
import { Button, Container } from "react-bootstrap";
import ImageUploading from "react-images-uploading";

const Form = () => {
  const { form, setForm } = useContext(AdminContext);
  const { image } = form;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    window.location = "/dashboard";
    fetch("/api/category", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(async (items) => {
      let result = await items.json();
      console.log("result", result);
    });
  };

  const onChange = (imageList) => {
    const { dataURL } = imageList[0];
    setForm({ ...form, image: dataURL });
    setValue("image", image);
  };

  console.log("form", form);
  console.log("errors", errors);

  useEffect(() => {
    setValue("image", image);
    register("image", { required: true });
  }, [image, register, setValue]);

  return (
    <Container>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ textAlign: "center", padding: "20px" }}
      >
        <input {...register("title", { required: true })} placeholder="Title" />
        <p style={{ color: "red" }}>
          {errors.title && <span>This field is required</span>}
        </p>
        <input
          {...register("description", { required: true })}
          placeholder="Description"
        />
        <p style={{ color: "red" }}>
          {errors.description && <span>This field is required</span>}
        </p>
        <ImageUploading value={image} onChange={onChange}>
          {({ onImageUpload, isDragging, dragProps }) => (
            <button
              style={
                isDragging
                  ? { color: "red", width: "50%", height: "200px" }
                  : { width: "20%", height: "200px" }
              }
              onClick={onImageUpload}
              {...dragProps}
            >
              +
            </button>
          )}
        </ImageUploading>
        <p style={{ color: "red" }}>
          {errors.image && <span>This field is required</span>}
        </p>
        <Button type="submit" variant="btn btn-primary">
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default Form;

// import { Container } from "react-bootstrap";
//
// import { AdminContext } from "../../Context/AdminContext";
// import { useForm } from "react-hook-form";
// import { registerHookForm } from "../atom/registerHookForm";
// import { createForm2 } from "../molecule/createForm2";
// import { updateForm2 } from "../molecule/updateForm2";
// import Handler from "./Handler";
//
// const Form = () => {
//   const { isTab, isForm, setIsForm, img } = useContext(AdminContext);
//   const { id, title, description, image } = isForm;
//   const { onSubmit, handleUpdate, handleCancel } = Handler();
//
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useForm();
//
//   useEffect(() => {
//     setValue("id", id);
//     setValue("title", title);
//     setValue("description", description);
//     image === "" ? setValue("image", img) : setValue("image", image);
//     registerHookForm(["title", "description", "image"], register);
//   }, [id, title, description, img, image, register, setValue, isTab]);
//
//   const onChange = (imageList) => {
//     const { data_url } = imageList[0];
//     setIsForm({ ...isForm, image: data_url });
//     setValue("image", image);
//   };
//
//   const loadForm = () => {
//     switch (isTab) {
//       case "create":
//         return createForm2(
//           isForm,
//           setIsForm,
//           image,
//           errors,
//           onChange,
//           handleSubmit(onSubmit)
//         );
//       case "update":
//         return updateForm2(
//           isForm,
//           setIsForm,
//           image,
//           errors,
//           onChange,
//           handleSubmit(handleUpdate),
//           handleCancel,
//           img
//         );
//       default:
//         return (
//           <>
//             <h1>This is default</h1>
//           </>
//         );
//     }
//   };
//
//   return <Container>{loadForm()}</Container>;
// };
//
// export default Form;
