import { useContext, useEffect } from "react";
import { Container } from "react-bootstrap";

import { AdminContext } from "../../Context/Dashboard/AdminContext";
import { useForm } from "react-hook-form";
import { registerHookForm } from "../atom/registerHookForm";
import { createForm2 } from "../molecule/createForm2";
import { updateForm2 } from "../molecule/updateForm2";
import Handler from "./Handler";

const Form = () => {
  const { isTab, isForm, setIsForm, img } = useContext(AdminContext);
  const { id, title, description, image } = isForm;
  const { onSubmit, handleUpdate, handleCancel } = Handler();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("id", id);
    setValue("title", title);
    setValue("description", description);
    image === "" ? setValue("image", img) : setValue("image", image);
    registerHookForm(["title", "description", "image"], register);
  }, [id, title, description, img, image, register, setValue, isTab]);

  const onChange = (imageList) => {
    const { data_url } = imageList[0];
    setIsForm({ ...isForm, image: data_url });
    setValue("image", image);
  };

  const loadForm = () => {
    switch (isTab) {
      case "create":
        return createForm2(
          isForm,
          setIsForm,
          image,
          errors,
          onChange,
          handleSubmit(onSubmit)
        );
      case "update":
        return updateForm2(
          isForm,
          setIsForm,
          image,
          errors,
          onChange,
          handleSubmit(handleUpdate),
          handleCancel,
          img
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

export default Form;
