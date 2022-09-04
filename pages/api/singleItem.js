import prisma from "../../lib/prisma";

const Handler = async (req, res) => {
  const { method, query } = req;

  switch (method) {
    case "GET":
      const { slug } = query;
      await prisma.category
        .findMany({ where: { title: slug } })
        .then((items) => {
          res.json({
            status: 200,
            data: items,
          });
        });
      break;
    default:
      break;
  }
};

export default Handler;
