import prisma from '../../lib/prisma';

export default async (req, res) => {
  const { method, body } = req;

  switch (method) {
    case 'POST':
      try {
        let result = await prisma.category.findFirst({
          where: { title: body.split('/')[1] },
        });
        res.status(200).json({
          data: { result },
        });
      } catch (err) {
        console.log('errCatch', err);
      }
      break;
    default:
      res.status(400).json({
        message: 'You have used the incorrect method',
      });
      break;
  }
};
