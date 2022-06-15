import { useContext, useEffect } from "react";
import { Container } from "react-bootstrap";

import { AdminContext } from "../../Context/AdminContext";
import { useForm } from "react-hook-form";
import { registerHookForm } from "../atom/registerHookForm2";
import { createForm2 } from "../molecule/createForm2";
import { updateForm2 } from "../molecule/updateForm2";
import Handler2 from "./Handler2";

const Form2 = () => {
  const { isTab, isForm, setIsForm, img } = useContext(AdminContext);
  const { id, title, description, image } = isForm;
  const { onSubmit, handleUpdate, handleCancel } = Handler2();

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
    setValue("image", img);
    registerHookForm(["id", "title", "description", "image"], register);
  }, [id, title, description, img, register, setValue, isTab]);

  const onChange = (imageList) => {
    const { data_url } = imageList[0];
    setIsForm({ ...isForm, image: data_url });
    setValue("image", data_url);
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

export default Form2;
