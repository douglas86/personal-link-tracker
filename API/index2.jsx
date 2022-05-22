import { useContext } from 'react';

import { useRouter } from 'next/router';

import { AdminContext } from '../Context/Dashboard/Admin/AdminContext';
import actionTypes, { Fetcher } from '../actionTypes/apiCalls.jsx';

export const pagination = async (endpoint) => {
  return await fetch(endpoint).then((res) => res.json());
};

export const GetRoute = (endpoint) => {
  return Fetcher(endpoint);
};

// export const PostRoute = (endpoint, body) => {
//   Posting(endpoint, body);
// };

const AdminApis = () => {
  const context = useContext(AdminContext);
  const { state } = context;
  const router = useRouter();

  const { postActions } = actionTypes();

  // create
  const Posting = (endpoint, body) => {
    postActions(endpoint, body);
  };

  // update
  const Putting = (endpoint, body) => {
    fetch(endpoint, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }).then(async (res) => {
      let result = await res.json();
      context.setState({
        ...state,
        message: result.message,
        alertColor: result.status !== 200 ? 'danger' : 'success',
        statusCode: result.status,
        showAlert: true,
      });
      router.reload(window.location.pathname);
      return result;
    });
  };

  // delete
  const Deleting = (endpoint, body) => {
    fetch(endpoint, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
      .then(async (res) => {
        let result = await res.json();
        context.setState({
          ...state,
          message: result.message,
          alertColor: result.status !== 200 ? 'danger' : 'success',
          statusCode: result.status,
          showAlert: true,
        });
        router.reload(window.location.pathname);
        return result;
      })
      .catch((err) => console.log('err', err));
  };

  return { Posting, Putting, Deleting };
};

export default AdminApis;
