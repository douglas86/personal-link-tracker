import { useContext } from "react";
import { Container } from "react-bootstrap";

import { AdminContext } from "../../../Context/Dashboard/Admin/AdminContext.jsx";
import styles from "../styles/Update.module.css";

const UpdateCategory = () => {
  const context = useContext(AdminContext);

  return (
    <div>
      <Container>
        <div className={styles.flex_container}>
          <div className={styles.flex_img}>
            <img
              src={
                context.state.image.indexOf("data") !== -1
                  ? `${context.state.image}`
                  : `data:image/jpeg;base64,${context.state.image}`
              }
              alt="title"
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default UpdateCategory;
