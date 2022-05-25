import { useContext } from 'react';

import { useRouter } from 'next/router';

import { AdminContext } from '../Context/Dashboard/Admin/AdminContext.jsx';

const actionCreators = () => {
  const { state, setState, setContent } = useContext(AdminContext);
  const router = useRouter();

  const postCreators = (props) => {
    const { status, message } = props;
    setContent('');
    setState({
      ...state,
      image: '',
      title: '',
      statusColor: status !== 200 ? 'danger' : 'success',
      statusCode: status,
      message,
      showAlert: true,
    });
    router.reload(window.location.pathname);
  };

  const putCreators = (props) => {
    const { status, message } = props;
    setContent('');
    setState({
      ...state,
      message,
      alertColor: status !== 200 ? 'danger' : 'success',
      statusCode: status,
      showAlert: true,
    });
    router.reload(window.location.pathname);
  };

  const deleteCreators = (props) => {
    const { status, message } = props;
    setContent('');
    setState({
      ...state,
      message,
      alertColor: status !== 200 ? 'danger' : 'success',
      statusCode: status,
      showAlert: true,
    });
    router.reload(window.location.pathname);
  };

  return { postCreators, putCreators, deleteCreators };
};

export default actionCreators;
