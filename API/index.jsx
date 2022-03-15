import useSWR from 'swr';

export const Fetcher = (endpoint) => {
  const fetcher = (url) => fetch(url).then(async (res) => await res.json());
  const { data } = useSWR(endpoint, fetcher);
  return data;
};

export const Posting = (endpoint, data) => {
  fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(async (res) => {
    let result = await res.json();
    console.log('result', result);
  });
};
