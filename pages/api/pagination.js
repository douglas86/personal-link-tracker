import { Get } from './controllers/paginationControllers';

export default async (req, res) => {
  const { method, query } = req;

  switch (method) {
    case 'GET':
      const { slug, skip } = query;
      Get(slug, skip, req, res);
      break;
    default:
      Default(res);
      break;
  }
};
