import { FindMany } from '../services/dataServices';

export const Get = async (query, res, req) => {
  const { skip, user } = query;

  FindMany(skip, user, res, req);
};

export const GetUser = async (query, res, req) => {
  const { skip, user } = query;

  FindMany(skip, user, res, req);
};
