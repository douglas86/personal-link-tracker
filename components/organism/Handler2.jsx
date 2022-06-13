import Api from "../../API";
import { useContext } from "react";
import { AdminContext } from "../../Context/AdminContext";

const Handler2 = () => {
  const { deleteRoute } = Api();

  const { setIsTab, setIsUpdatedTab, setContent, setTitle } =
    useContext(AdminContext);

  const handleUpdate = (id, title, description) => {
    setIsTab("update");
    setIsUpdatedTab(true);
    setTitle(title);
    setContent(description);
  };

  const handleConfirm = (id, title) => {
    const body = { id, title };
    let answer = window.confirm("Are you sure you want to delete");
    if (answer) {
      handleDelete(body);
    }
  };

  const handleDelete = (body) => deleteRoute("/api/category", body);

  return {
    handleUpdate,
    handleConfirm,
    handleDelete,
  };
};

export default Handler2;
