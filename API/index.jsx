import { useContext } from 'react';
import useSWR from 'swr';

import { AdminContext } from '../Context/Dashboard/Admin/AdminContext';

const Apis = () => {
  const context = useContext(AdminContext);
  const { state } = context;

  const Fetcher = (endpoint) => {
    const fetcher = (url) => fetch(url).then((res) => res.json());
    const { data } = useSWR(endpoint, fetcher);
    return data;
  };

  const Posting = (endpoint, body) => {
    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
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
    });
  };

  return { Fetcher, Posting };
};

export default Apis;
