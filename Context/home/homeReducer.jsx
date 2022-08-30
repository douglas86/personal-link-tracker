export const homeReducer = (state, action) => {
  const { type, data, alertStatus, alert } = action;
  switch (type) {
    case "data":
      return {
        alertStatus: 0,
        alert: "",
        data,
      };
    case "alert":
      return {
        ...state[0],
        alertStatus,
        alert,
      };
    case "reset_alert":
      return {
        ...state[0],
        alert: "",
        alertStatus: 0,
      };
    case "reset":
      return {};
    default:
      return state;
  }
};
