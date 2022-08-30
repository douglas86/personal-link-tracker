export const onError = (err) => {
  return {
    status: 400,
    message: err.message,
  };
};
