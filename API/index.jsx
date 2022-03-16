import { useContext } from 'react';
import useSWR from 'swr';

import { AdminContext } from '../Context/Dashboard/Admin/AdminContext';

const Apis = () => {
  const context = useContext(AdminContext);
  const { state } = context;

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
        name: '',
        message: result.message,
        image: '',
        alertColor: result.status !== 200 ? 'danger' : 'success',
        statusCode: result.status,
        showAlert: true,
      });
    });
  };

  // read;
  const Fetcher = (endpoint) => {
    const fetcher = (url) => fetch(url).then((res) => res.json());
    const { data } = useSWR(endpoint, fetcher);
    return data;
  };

  // update

  // delete
  const Deleting = (endpoint, body) => {
    fetch(endpoint, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
      .then(async (res) => {
        let result = await res.json();
        return result;
      })
      .catch((err) => console.log('err', err));
  };

  return { Posting, Fetcher, Deleting };
};

export default Apis;
