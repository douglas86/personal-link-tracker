import {
  deleteServices,
  postServices,
  putServices,
} from "../services/categoryServices";

// create controller
export const postController = async (body, res) => {
  await postServices(body, res);
};

// update controller
export const putController = async (body, res) => {
  await putServices(body, res);
};

// delete controller
export const deleteController = async (body, res) => {
  await deleteServices(body, res);
};
