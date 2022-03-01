import prisma from "../../lib/prisma";
import { getSession } from "next-auth/react";

export default async (req, res) => {
  const { method, body } = req;
  const session = await getSession({ req });

  switch (method) {
    case "POST":
      const { title, url, categories, type, medium } = body;
      try {
        let result =
          title && url && categories && type && medium
            ? await prisma.links
                .create({
                  data: {
                    postedBy: { connect: { email: session?.user?.email } },
                    title,
                    url,
                    categoryId: categories,
                    type,
                    medium,
                  },
                })
                .then(() => {
                  res.status(200).json({
                    message: "You have successfully saved to db",
                  });
                })
                .catch(() => {
                  res.status(400).json({
                    message: "There was an error saving your data",
                  });
                })
            : res.status(400).json({
                message: "The form that you have filled out is incomplete",
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
