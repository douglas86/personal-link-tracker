export const registerHookForm = (arr, register) => {
  arr.map((items) => {
    register(items, { required: true });
  });
};
