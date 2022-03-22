import { Container } from 'react-bootstrap';

import Header from '../../components/Admin/header.jsx';
import ShowAlert from '../../components/Admin/alert';
import Form from '../../components/Admin/form';

const Create = () => {
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

export default Create;
