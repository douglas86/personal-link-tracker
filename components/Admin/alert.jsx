import { useContext } from 'react';
import { Alert } from 'react-bootstrap';
import { AdminContext } from '../../Context/Dashboard/Admin/AdminContext';

const ShowAlert = () => {
  const context = useContext(AdminContext);
  const { state } = context;
  const { message, showAlert, alertColor } = state;

  return (
    <>
      {showAlert ? (
        <Alert
          style={{ marginTop: '5px' }}
          variant={alertColor}
          onClose={() => context.setState({ ...state, showAlert: false })}
        >
          <Alert.Heading>{message}</Alert.Heading>
        </Alert>
      ) : null}
    </>
  );
};

export default ShowAlert;
