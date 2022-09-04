export const slugReducer = (state, action) => {
  const { type, category, len, data } = action;
  switch (type) {
    case "reset":
      return {
        category,
        len,
        data,
      };
    case "update_data":
      return {
        ...state[0],
        data,
      };
    default:
      return state[0];
  }
};
