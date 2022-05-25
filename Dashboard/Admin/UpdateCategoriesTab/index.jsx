import { useContext } from 'react';
import { Container } from 'react-bootstrap';

import { AdminContext } from '../../../Context/Dashboard/Admin/AdminContext.jsx';
import Form from '../../../components/Admin/form.jsx';
import styles from '../styles/Update.module.css';
import Header from '../../../components/Admin/header.jsx';

const UpdateCategory = () => {
  const context = useContext(AdminContext);

  return (
    <div>
      <Container>
        <Header />
        <div className={styles.flex_container}>
          <div className={styles.flex_form}>
            <Form />
          </div>
          <div className={styles.flex_img}>
            <img
              src={
                context.state.image.indexOf('data') !== -1
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
