import { getSession } from 'next-auth/react';

import prisma from '../../lib/prisma';
import { Get, GetUser } from './controllers/dataControllers';

export default async (req, res) => {
  const { method, query } = req;

  switch (method) {
    case 'GET':
      const { user } = query;
      const session = await getSession({ req });

      if (user === 'false') {
        Get(query, res);
      } else {
        GetUser(query, res, req);
      }
      break;
    default:
      res.status(400).json({
        status: 400,
        message: 'Something went wrong retrieving the data',
      });
      break;
  }
};
