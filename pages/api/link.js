import prisma from '../../lib/prisma';
import { getSession } from 'next-auth/react';

export default async (req, res) => {
  const { method, body } = req;
  const session = await getSession({ req });

  const {
    id,
    category,
    type,
    medium,
    formTitle,
    formURL,
    title,
    categoryNames,
    url,
  } = body;

  switch (method) {
    case 'GET':
      try {
        let result = await prisma.links.findMany();
        res.status(200).json({
          data: result,
        });
      } catch (err) {
        res.status(400).json({
          message: err.message,
        });
      }
      break;
    case 'POST':
      // const { category, type, medium, formTitle, formURL } = body;
      try {
        await prisma.links
          .create({
            data: {
              postedBy: { connect: { email: session?.user?.email } },
              userName: session?.user?.name,
              categoryNames: category,
              type,
              medium,
              title: formTitle,
              url: formURL,
            },
          })
          .then(() => {
            res.json({
              status: 200,
              message: 'Data has been successfully saved to db',
            });
          });
      } catch (err) {
        console.log('err', err);
      }
      break;
    case 'PUT':
      console.log('body', body);
      // const { id, title, url, medium, type, categoryNames } = body;
      await prisma.links
        .update({
          where: { id },
          data: { title, url, medium, type, categoryNames },
        })
        .then(() => {
          res.json({ status: 200, message: 'Successfully updated record' });
        });
      break;
    case 'DELETE':
      const { id } = body;
      await prisma.links.delete({ where: { id } }).then(() => {
        res.send('Successfully deleted');
      });
    default:
      res.status(400).json({
        error: 'No response',
      });
      break;
  }
};
