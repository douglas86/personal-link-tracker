import { getSession } from 'next-auth/react';

let len = 0;

export const Len = async (user, req) => {
  const session = await getSession({ req });

  if (user === 'true') {
    const find = await prisma.links.findMany({
      where: { userName: session?.user.name },
    });
    return find.length;
  } else {
    const find = await prisma.links.findMany({});
    return find.length;
  }
};

export const FindMany = async (skip, user, res, req) => {
  const session = await getSession({ req });

  Len(user, req).then((re) => {
    len = re;
  });

  if (user === 'true') {
    await prisma.links
      .findMany({
        where: { userName: session?.user.name },
        skip: parseInt(skip),
        take: 2,
      })
      .then((re) => {
        res.json({
          status: 200,
          data: re,
          len,
        });
      });
  } else {
    await prisma.links
      .findMany({
        skip: parseInt(skip),
        take: 2,
      })
      .then((re) => {
        res.json({
          status: 200,
          data: re,
          len,
        });
      });
  }
};
