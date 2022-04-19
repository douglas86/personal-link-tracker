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
          .then(async (r) => {
            const Length = await prisma.links
              .findMany({
                where: { userName: session.user.name },
              })
              .then((re) => {
                res.json({
                  data: r,
                  leng: re.length,
                });
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
    case 'GET':
      await prisma.links
        .findMany({
          where: { userName: session.user.name },
          take: 3,
        })
        .then(async (r) => {
          await prisma.links
            .findMany({
              where: { userName: session.user.name },
            })
            .then((re) => {
              res.json({
                data: r,
                leng: re.length,
              });
            });
        });
    default:
      console.log('default hit');
      break;
  }
};
