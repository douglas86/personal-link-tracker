export const homeReducer = (state, action) => {
  const { type, data } = action;
  switch (type) {
    case "data":
      return data;
    case "reset":
      return {};
    default:
      return state;
  }
};
