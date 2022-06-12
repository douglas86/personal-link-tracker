import actionTypes, { Fetcher } from "../actionTypes/apiCalls";

export const pagination = async (endpoint) => {
  return await fetch(endpoint).then((res) => res.json());
};

export const GetRoute = (endpoint) => {
  return Fetcher(endpoint);
};

const Api = () => {
  const { postActions, deleteActions } = actionTypes();

  const Posting = (endpoint, body) => {
    console.log("Posting", body);
    postActions(endpoint, body);
    // postActions(endpoint, body);
  };

  // delete
  const deleteRoute = (endpoint, body) => {
    deleteActions(endpoint, body);
  };

  return {
    Posting,
    deleteRoute,
  };
};

export default Api;
