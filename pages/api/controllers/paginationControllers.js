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

// export const Get = (slug, skip, req, res) => {
//   switch (slug) {
//     case 'allLinks':
//       FindAllLinks(slug, skip, res, req);
//       break;
//     case 'myLinks':
//       FindMyLinks(slug, skip, res, req);
//       break;
//     default:
//       FindCategory(slug, skip, res, req);
//       break;
//   }
// };
