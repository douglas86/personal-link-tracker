import { deleteServices } from '../services/categoryServices';

export const deleteController = async (body, res) => {
    deleteServices(body, res);
};
