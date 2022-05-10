import prisma from '../../lib/prisma';

export default async (req, res) => {
  const { method, body, query } = req;

  switch (method) {
    case 'POST':
      await prisma.links.findMany({ skip: 0, take: 3 }).then((r) => {
        res.json({
          status: 200,
          data: r,
        });
      });
      break;
    case 'GET':
      const { skip } = query;

      await prisma.links
        .findMany({
          skip: parseInt(skip),
          take: 2,
        })
        .then((re) => {
          res.json({
            status: 200,
            data: re,
          });
        });
      break;
    default:
      res.status(400).json({
        status: 400,
        message: 'Something went wrong retrieving the data',
      });
      break;
  }
};
