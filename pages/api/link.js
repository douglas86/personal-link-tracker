import prisma from "../../lib/prisma";
import { getSession } from "next-auth/react";

export default async (req, res) => {
  const { method, body } = req;
  const session = await getSession({ req });

  switch (method) {
    case "POST":
      const { title, url, categories, type, medium } = body;
      try {
        await prisma.links.create({
          data: {
            postedBy: { connect: { email: session?.user?.email } },
            title,
            url,
            categoryId: categories,
            type,
            medium,
          },
        });
        res.status(200).json({
          message: "You have successfully saved to db",
        });
      } catch (err) {
        res.status(400).json({
          message: err.message,
        });
      }
      break;
    default:
      res.status(400).json({
        error: "No response",
      });
      break;
  }
};
