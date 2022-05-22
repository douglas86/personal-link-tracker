import actionTypes, { Fetcher } from '../actionTypes/apiCalls.jsx';

export const pagination = async (endpoint) => {
  return await fetch(endpoint).then((res) => res.json());
};

export const GetRoute = (endpoint) => {
  return Fetcher(endpoint);
};

const AdminApis = () => {
  const { postActions, putActions, deleteActions } = actionTypes();

  // create
  const Posting = (endpoint, body) => {
    postActions(endpoint, body);
  };

  // update
  const Putting = (endpoint, body) => {
    putActions(endpoint, body);
  };

  // delete
  const Deleting = (endpoint, body) => {
    deleteActions(endpoint, body);
  };

  return { Posting, Putting, Deleting };
};

export default AdminApis;
