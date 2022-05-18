import { Default, Get, GetUser, GetSlug } from './controllers/dataControllers';

export default async (req, res) => {
  const { method, query } = req;

  switch (method) {
    case 'GET':
      const { skip, user, slug } = query;

      if (user === 'true') {
        GetUser(skip, res, req);
      } else if (slug !== 'undefined') {
        GetSlug(slug, skip, res, req);
      } else {
        Get(skip, res, req);
      }

      break;
    default:
      Default(res);
      break;
  }
};
