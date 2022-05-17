import { FindMany } from '../services/dataServices';

export const Default = async (res) => {
  res.status(400).json({
    status: 400,
    message: 'Something went wrong retrieving the data',
  });
};

export const Get = async (query, res, req) => {
  const { skip, user } = query;

  FindMany(skip, user, res, req);
};

export const GetUser = async (query, res, req) => {
  const { skip, user } = query;

  FindMany(skip, user, res, req);
};
