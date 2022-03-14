import useSWR from 'swr';

export const Fetcher = (endpoint) => {
  const fetcher = (url) => fetch(url).then(async (res) => await res.json());
  const { data } = useSWR(endpoint, fetcher);
  return data;
};
