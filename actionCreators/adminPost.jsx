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
      statusCode: status,
      message,
      showAlert: true,
    });
    router.reload(window.location.pathname);
  };
  return { postCreators };
};

export default actionCreators;
