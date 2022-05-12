import { getSession } from 'next-auth/react';

import prisma from '../../lib/prisma';

export default async (req, res) => {
  const { method, query } = req;

  switch (method) {
    case 'GET':
      const { skip, user } = query;
      const session = await getSession({ req });

      if (!user) {
        let len = await prisma.links.findMany({});

        await prisma.links
          .findMany({
            skip: parseInt(skip),
            take: 2,
          })
          .then(async (re) => {
            res.json({
              status: 200,
              data: re,
              len: len.length,
            });
          });
      } else {
        let len = await prisma.links.findMany({
          where: { userName: session?.user.name },
        });

        await prisma.links
          .findMany({
            where: { userName: session?.user.name },
            skip: parseInt(skip),
            take: 2,
          })
          .then(async (re) => {
            res.json({
              status: 200,
              data: re,
              len: len.length,
            });
          });
      }
      break;
    default:
      res.status(400).json({
        status: 400,
        message: 'Something went wrong retrieving the data',
      });
      break;
  }
};
