import { useState, useEffect, useContext } from 'react';
import useSWR from 'swr';
import { AdminContext } from '../Context/Dashboard/Admin/AdminContext';

const Apis = () => {
  const [data, setDate] = useState();
  const context = useContext(AdminContext);
  console.log('context', context);

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
      setDate(result);
    });
    return data;
  };

  return { Fetcher, Posting };
};

export default Apis;
