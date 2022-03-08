import useSWR from 'swr';

export const Get = (url) => {
  const fetcher = (props) => fetch(props).then((res) => res.json());
  const { data } = useSWR(url, fetcher);
  return data;
};
