import prisma from '../../lib/prisma';

export default async (req, res) => {
  const { method, body } = req;
  const { skip, slug } = body;

  switch (method) {
    case 'POST':
      const Links = await prisma.links
        .findMany({
          where: { categoryNames: { has: slug } },
          skip,
          take: 3,
        })
        .then((r) => {
          res.json({
            data: r,
          });
        });
      break;
    default:
      console.log('default hit');
      break;
  }
};
