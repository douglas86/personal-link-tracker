export const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE":
      return {
        ...state,
        category: [
          ...state.category,
          { title: action.category, checked: false },
        ],
      };
    default:
      return state;
  }
};
