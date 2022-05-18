import { Container } from 'react-bootstrap';

import Header from '../../../components/Admin/header.jsx';
import ShowAlert from '../../../components/Admin/alert.jsx';
import Form from '../../../components/Admin/form.jsx';

const CreateCategory = () => {
  return (
    <>
      <Container>
        <Header />
        <ShowAlert />
        <Form />
      </Container>
    </>
  );
};

export default CreateCategory;
