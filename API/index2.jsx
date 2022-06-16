import actionTypes from "../actionTypes/apiCalls.jsx";

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
