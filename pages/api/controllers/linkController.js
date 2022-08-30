import prisma from "../../../lib/prisma";

export const postControllers = async (session, body) => {
  const { category, types, medium, formData } = body;
  const { title, url } = formData;

  await prisma.links.create({
    data: {
      postedBy: {
        connect: { email: session?.user?.email },
      },
      userName: session?.user?.name,
      categoryNames: category,
      type: types,
      medium,
      title,
      url,
    },
  });
};
