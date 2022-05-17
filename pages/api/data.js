import { Default, Get, GetUser } from './controllers/dataControllers';

export default async (req, res) => {
  const { method, query } = req;

  switch (method) {
    case 'GET':
      const { user } = query;

      if (!user) {
        Get(query, res, req);
      } else {
        GetUser(query, res, req);
      }
      break;
    default:
      Default(res);
      break;
  }
};
