import Form from "../../components/organism/Form";
import { AdminProvider } from "../../Context/AdminContext";

const CreateCategory = () => {
  return (
    <>
      <AdminProvider>
        <Form />
      </AdminProvider>
    </>
  );
};

export default CreateCategory;
