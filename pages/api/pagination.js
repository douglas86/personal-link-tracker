import prisma from '../../lib/prisma';

export default async (req, res) => {
  const { method, body } = req;
  const { slug } = body;

  switch (method) {
    case 'POST':
      console.log('body', body);
      break;
    default:
      console.log('default hit');
      break;
  }
};
