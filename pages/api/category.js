import prisma from '../../lib/prisma';

export default async (req, res) => {
  const { method, body } = req;

  switch (method) {
    case 'GET':
      console.log('You have hit a GET request');
      break;
    default:
      res.status(400).json({
        message: 'You have used the incorrect method',
      });
      break;
  }
};
