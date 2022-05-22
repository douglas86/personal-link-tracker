import useSWR from 'swr';
import actionCreators from '../actionCreators/adminPost';

export const Fetcher = (endpoint) => {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data } = useSWR(endpoint, fetcher, { revalidateOnFocus: false });

  return { data: data !== undefined ? data.data : undefined };
};

const actionTypes = () => {
  const { postCreators } = actionCreators();

  const postActions = (endpoint, body) => {
    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }).then(async (items) => {
      let result = await items.json();
      postCreators(result);
    });
  };
  return { postActions };
};

export default actionTypes;
