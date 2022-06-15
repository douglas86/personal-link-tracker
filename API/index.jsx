import actionTypes, { Fetcher } from "../actionTypes/apiCalls";

export const pagination = async (endpoint) => {
  return await fetch(endpoint).then((res) => res.json());
};

export const GetRoute = (endpoint) => {
  return Fetcher(endpoint);
};

const Api = () => {
  const { postActions, putActions, deleteActions } = actionTypes();

  // create
  const posting = (endpoint, body) => {
    postActions(endpoint, body);
  };

  // update
  const putting = (endpoint, body) => {
    putActions(endpoint, body);
  };

  // delete
  const deleteRoute = (endpoint, body) => {
    deleteActions(endpoint, body);
  };

  return {
    posting,
    putting,
    deleteRoute,
  };
};

export default Api;
