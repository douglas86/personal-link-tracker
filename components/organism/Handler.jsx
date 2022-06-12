import { useContext } from "react";

import Api from "../../API";

import { AdminContext } from "../../Context/AdminContext";

const Handler = () => {
  const { posting, deleteRoute } = Api();

  const { setIsTab, setIsUpdatedTab, setIsForm, setContent } =
    useContext(AdminContext);

  const handleUpdate = (id, title, description, image) => {
    setIsTab("update");
    setIsUpdatedTab(true);
    setIsForm({ title, image, buttonText: "Update" });
    setContent(description);
  };

  const handleConfirm = (body) => {
    let answer = window.confirm("Are you sure you want to delete");
    if (answer) {
      handleDelete(body);
    }
  };

  const handleDelete = (body) => deleteRoute("/api/category", body);

  const onSubmit = (data) => {
    setIsTab("all");
    posting("/api/category", data);
  };

  const onChangeImage = (imageList, setImages, setValue) => {
    const { data_url } = imageList[0];
    setImages(data_url);
    setValue("image", data_url);
  };

  return {
    handleUpdate,
    handleConfirm,
    onSubmit,
    onChangeImage,
  };
};

export default Handler;
