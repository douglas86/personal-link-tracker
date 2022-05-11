export const pagination = async (endpoint) => {
  return await fetch(endpoint).then((res) => res.json());
};
