import actionTypes, { Fetcher } from "../actionTypes/apiCalls";

export const pagination = async (endpoint) => {
  return await fetch(endpoint).then((res) => res.json());
};

export const GetRoute = (endpoint) => {
  return Fetcher(endpoint);
};

const Api = () => {
  const { postActions, deleteActions } = actionTypes();

  const posting = (endpoint, body) => {
    postActions(endpoint, body);
  };

  // delete
  const deleteRoute = (endpoint, body) => {
    deleteActions(endpoint, body);
  };

  return {
    posting,
    deleteRoute,
  };
};

export default Api;
