import Api from "../../API";
import { useContext } from "react";
import { AdminContext } from "../../Context/AdminContext";

const Handler2 = () => {
  const { posting, deleteRoute } = Api();

  const { setIsTab } = useContext(AdminContext);

  const handleUpdate = (data) => {
    console.log(`handleUpdate was clicked and your data is: ${data}`);
  };

  const handleConfirm = (id, title) => {
    const body = { id, title };
    let answer = window.confirm("Are you sure you want to delete");
    if (answer) {
      handleDelete(body);
    }
  };

  const handleDelete = (body) => deleteRoute("/api/category", body);

  const onSubmit = (data) => {
    setIsTab("home");
    posting("/api/category", data);
  };

  return {
    handleUpdate,
    handleConfirm,
    handleDelete,
    onSubmit,
  };
};

export default Handler2;
