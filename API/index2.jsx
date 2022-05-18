import { useContext } from 'react';
import useSWR from 'swr';

import { useRouter } from 'next/router';

import { AdminContext } from '../Context/Dashboard/Admin/AdminContext';

export const pagination = async (endpoint) => {
  return await fetch(endpoint).then((res) => res.json());
};

const AdminApis = () => {
  const context = useContext(AdminContext);
  const { state } = context;
  const router = useRouter();

  // create;
  const Posting = (endpoint, body) => {
    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then(async (res) => {
      let result = await res.json();
      context.setContent('');
      context.setImageUploadButtonName('Upload image');
      context.setState({
        ...state,
        title: '',
        message: result.message,
        image: '',
        alertColor: result.status !== 200 ? 'danger' : 'success',
        statusCode: result.status,
        showAlert: true,
      });
      router.reload(window.location.pathname);
    });
  };

  // read;
  const Fetcher = (endpoint) => {
    const fetcher = (url) => fetch(url).then((res) => res.json());
    const { data } = useSWR(endpoint, fetcher, {
      revalidateOnFocus: false,
    });
    return data;
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

  return { Posting, Fetcher, Putting, Deleting };
};

export default AdminApis;
