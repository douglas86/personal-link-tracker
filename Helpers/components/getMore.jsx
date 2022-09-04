export const getMore = async (endpoint, state, dispatch) => {
  const res = await fetch(endpoint);
  const newData = await res.json();
  dispatch({ type: "update_data", data: [...state[0].data, ...newData.data] });
};
