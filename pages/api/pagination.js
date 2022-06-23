import { Default } from "./controllers/paginationControllers";

const Handler = async (req, res) => {
  const { method, query } = req;

  switch (method) {
    case "GET":
      const { _start, _limit } = query;
      await prisma.links
        .findMany({
          skip: parseInt(_start),
          take: parseInt(_limit),
        })
        .then((items) => {
          res.json(items);
        });
      break;
    default:
      await Default(res);
      break;
  }
};

export default Handler;
