import { getSession } from "next-auth/react";

const Handler = async (req, res) => {
  const { method } = req;
  const session = await getSession({ req });

  switch (method) {
    case "GET":
      await prisma.user
        .findMany({ where: { name: session?.user.name } })
        .then((items) => {
          console.log("items", items);
          res.json({
            status: 200,
            data: items,
          });
        });
      break;
    default:
      console.log("Default endpoint used");
      break;
  }
};

export default Handler;
