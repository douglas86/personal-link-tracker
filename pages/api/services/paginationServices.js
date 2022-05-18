import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

let len = 0;

export const Len = async (query, req) => {
  const session = await getSession({ req });

  if (query === 'true') {
    await prisma.links
      .findMany({
        where: { userName: session?.user.name },
      })
      .then((items) => {
        len = items.length;
      });
  } else if (query !== undefined) {
    await prisma.links
      .findMany({
        where: { categoryNames: { has: 'Next' } },
      })
      .then((items) => {
        len = items.length;
      });
  } else {
    await prisma.links.findMany({}).then((items) => {
      len = items.length;
    });
  }
};

export const FindMany = async (skip, res) => {
  await Len();

  await prisma.links
    .findMany({ skip: parseInt(skip), take: 2 })
    .then((items) => {
      res.json({
        status: 200,
        data: items,
        len,
      });
    });
};

export const FindUser = async (skip, req, res) => {
  const session = await getSession({ req });

  await Len('true', req);

  await prisma.links
    .findMany({
      where: { userName: session?.user.name },
      skip: parseInt(skip),
      take: 2,
    })
    .then((items) => {
      res.json({
        status: 200,
        data: items,
        len,
      });
    });
};

export const FindSlug = async (slug, skip, res) => {
  await Len(slug);

  await prisma.links
    .findMany({
      where: { categoryNames: { has: slug } },
      skip: parseInt(skip),
      take: 2,
    })
    .then((items) => {
      res.json({
        status: 200,
        data: items,
        len,
      });
    });
};
