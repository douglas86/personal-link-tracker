import { postServices, deleteServices } from "../services/categoryServices";

// create controller
export const postController = async (body, res) => {
  await postServices(body, res);
};

// delete controller
export const deleteController = async (body, res) => {
  await deleteServices(body, res);
};
