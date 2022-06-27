import { Find } from "../services/paginationServices";

export const Default = async (res) => {
  res.status(400).json({
    status: 400,
    message: "Something went wrong retrieving the data",
  });
};

export const GetAllLinks = async (res, _start, _limit) => {
  await prisma.links
    .findMany({
      skip: parseInt(_start),
      take: parseInt(_limit),
    })
    .then((items) => {
      Find(res, items);
    });
};

export const GetMyLinks = async (res, session, _start, _limit) => {
  await prisma.links
    .findMany({
      where: { userName: session?.user.name },
      skip: parseInt(_start),
      take: parseInt(_limit),
    })
    .then((items) => {
      Find(res, items);
    });
};

export const GetCategories = async (res, _router, _start, _limit) => {
  await prisma.links
    .findMany({
      where: {
        categoryNames: { hasEvery: [_router] },
      },
      skip: parseInt(_start),
      take: parseInt(_limit),
    })
    .then((items) => {
      Find(res, items);
    });
};
