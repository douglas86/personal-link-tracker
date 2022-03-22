import { useContext } from 'react';
import { Container } from 'react-bootstrap';

import Header from '../../components/Admin/header.jsx';
import ShowAlert from '../../components/Admin/alert';
import Form from '../../components/Admin/form';
import { AdminContext } from '../../Context/Dashboard/Admin/AdminContext';

const Create = () => {
  const context = useContext(AdminContext);
  console.log('context', context);

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
