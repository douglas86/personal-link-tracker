import { useContext } from 'react';
import { Container } from 'react-bootstrap';

import { AdminContext } from '../../Context/Dashboard/Admin/AdminContext.jsx';
import Form from '../../components/Admin/form';
import styles from './styles/Update.module.css';
import Header from '../../components/Admin/header.jsx';

const Update = () => {
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
              src={`data:image/jpeg;base64,${context.state.image}`}
              alt="title"
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Update;
