import useSWR from 'swr';

export const Fetcher = (endpoint) => {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data } = useSWR(endpoint, fetcher, { revalidateOnFocus: false });

  return { data: data !== undefined ? data.data : undefined };
};
