import { useContext, useEffect } from "react";
import { Container } from "react-bootstrap";

import { AdminContext } from "../../Context/AdminContext";
import { useForm } from "react-hook-form";
import { registerHookForm } from "../atom/registerHookForm2";
import { createForm2 } from "../molecule/createForm2";
import { updateForm2 } from "../molecule/updateForm2";
import Handler2 from "./Handler2";

const Form2 = () => {
  const { isTab, isForm, setIsForm } = useContext(AdminContext);
  const { title, description, image } = isForm;
  const { onSubmit, handleCancel } = Handler2();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("title", title);
    setValue("description", description);
    registerHookForm(["title", "description", "image"], register);
  }, [title, description, register, setValue, isTab]);

  console.log("isTab", isTab);
  console.log("title", title);
  console.log("isForm", isForm);

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
          handleSubmit(onSubmit),
          handleCancel
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
