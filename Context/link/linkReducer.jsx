export const linkReducer = (state, action) => {
  const { type, data, event, title, name } = action;

  switch (type) {
    case "populate_store":
      return {
        category: [],
        types: "",
        medium: "",
        data,
      };
    case "checkbox":
      let updateList = [...state[0].category];
      if (event) {
        updateList = [...state[0].category, title];
      } else {
        updateList.splice(state[0].category.indexOf(title), 1);
      }
      return {
        ...state[0],
        category: updateList,
      };
    case "radio":
      return {
        ...state[0],
        [name]: title,
      };
    case "reset":
      return {};
    default:
      return state;
  }
};
