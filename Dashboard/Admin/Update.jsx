import { useContext } from 'react';
import { Container } from 'react-bootstrap';

import { AdminContext } from '../../Context/Dashboard/Admin/AdminContext.jsx';
import Form from '../../components/Admin/form';

const Update = () => {
  const context = useContext(AdminContext);

  console.log('context', context);

  return (
    <div>
      <Container>
        <Form />
      </Container>
    </div>
  );
};

export default Update;
