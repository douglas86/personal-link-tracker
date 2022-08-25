import useSWR from "swr";

const useFetch = (endpoint) => {
  const fetcher = () => fetch(endpoint).then(async (res) => await res.json());
  const { data } = useSWR(endpoint, fetcher, { revalidateOnFocus: false });

  return { data: data !== undefined ? data.data : undefined };
};

export default useFetch;
