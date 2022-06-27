import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

let len = 0;

export const Len = async (slug, req) => {
  const session = await getSession({ req });

  switch (slug) {
    case "allLinks":
      await prisma.links.findMany({}).then((items) => {
        len = items.length;
      });
      break;
    case "myLinks":
      await prisma.links
        .findMany({ where: { userName: session?.user.name } })
        .then((items) => {
          len = items.length;
        });
      break;
    default:
      await prisma.links
        .findMany({ where: { categoryNames: { has: slug } } })
        .then((items) => {
          len = items.length;
        });
      break;
  }
};

export const Find = async (res, items) => {
  res.json(items);
};

export const FindMyLinks = async (slug, skip, res, req) => {
  const session = await getSession({ req });

  await Len(slug, req);

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

export const FindCategory = async (slug, skip, res, req) => {
  await Len(slug, req);

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
