import Api from "../../API";
import { useContext } from "react";
import { AdminContext } from "../../Context/AdminContext";

const Handler2 = () => {
  const { posting, putting, deleteRoute } = Api();

  const { setIsUpdatedTab, setIsTab, setIsForm, setImg } =
    useContext(AdminContext);

  const handleUpdateClick = (id, title, description, image) => {
    setIsUpdatedTab(true);
    setIsTab("update");
    setIsForm({ id, title, description, image: "" });
    setImg(image);
  };

  const handleUpdate = (data) => {
    putting("/api/category", data);
  };

  const handleConfirm = (id, title) => {
    const body = { id, title };
    let answer = window.confirm("Are you sure you want to delete");
    if (answer) {
      handleDelete(body);
    }
  };

  const handleDelete = (body) => deleteRoute("/api/category", body);

  const handleCancel = () => {
    setIsTab("home");
  };

  const onSubmit = (data) => {
    setIsTab("home");
    posting("/api/category", data);
  };

  return {
    handleUpdateClick,
    handleUpdate,
    handleConfirm,
    handleDelete,
    handleCancel,
    onSubmit,
  };
};

export default Handler2;
