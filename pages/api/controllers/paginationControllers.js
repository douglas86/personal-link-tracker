import { FindMany, FindUser, FindSlug } from '../services/paginationServices';

export const Default = async (res) => {
  res.status(400).json({
    status: 400,
    message: 'Something went wrong retrieving the data',
  });
};

export const Get = async (skip, res) => {
  FindMany(skip, res);
};

export const GetSlug = async (slug, skip, res) => {
  FindSlug(slug, skip, res);
};

export const GetUser = async (skip, res, req) => {
  FindUser(skip, req, res);
};
