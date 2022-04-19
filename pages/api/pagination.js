import { getSession } from 'next-auth/react';
import prisma from '../../lib/prisma';

export default async (req, res) => {
  const { method, body } = req;
  const { skip, slug } = body;

  const session = await getSession({ req });

  switch (method) {
    case 'POST':
      if (slug === 'none') {
        await prisma.links
          .findMany({
            where: { userName: session.user.name },
            skip,
            take: 3,
          })
          .then((r) => {
            res.json({
              data: r,
            });
          });
      } else {
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
      }
      break;
    default:
      console.log('default hit');
      break;
  }
};
