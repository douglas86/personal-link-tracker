import { getSession } from 'next-auth/react';

import prisma from '../../../lib/prisma';

export const Get = async (query, res) => {
  const { skip } = query;

  let len = await prisma.links.findMany({});

  await prisma.links.findMany({ skip: parseInt(skip), take: 2 }).then((re) => {
    res.json({
      status: 200,
      data: re,
      len: len.length,
    });
  });
};

export const GetUser = async (query, res, req) => {
  const session = await getSession({ req });

  const { skip, user } = query;

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
};
