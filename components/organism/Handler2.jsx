import Api from "../../API";
import { useContext } from "react";
import { AdminContext } from "../../Context/AdminContext";

const Handler2 = () => {
  const { posting, deleteRoute } = Api();

  const { setIsUpdatedTab, setIsTab, setIsForm } = useContext(AdminContext);

  const handleUpdate = (id, title, description) => {
    setIsUpdatedTab(true);
    setIsTab("update");
    setIsForm({ id, title, description, image: "" });
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
    handleUpdate,
    handleConfirm,
    handleDelete,
    handleCancel,
    onSubmit,
  };
};

export default Handler2;
