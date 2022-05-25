import {
  FindAllLinks,
  FindMyLinks,
  FindCategory,
} from '../services/paginationServices';

export const Default = async (res) => {
  res.status(400).json({
    status: 400,
    message: 'Something went wrong retrieving the data',
  });
};

export const Get = (slug, skip, req, res) => {
  switch (slug) {
    case 'allLinks':
      FindAllLinks(slug, skip, res, req);
      break;
    case 'myLinks':
      FindMyLinks(slug, skip, res, req);
      break;
    default:
      FindCategory(slug, skip, res, req);
      break;
  }
};
