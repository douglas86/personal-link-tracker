import { getSession } from 'next-auth';
import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
    const session = await getSession({ req });
    const { method } = req;

    switch (method) {
        case 'GET':
            if (session) {
                const finding = await prisma.user.findUnique({
                    where: {
                        email: session.user.email,
                    },
                });
                let result =
                    finding === null
                        ? await prisma.user.create({
                              data: {
                                  email: session.user.email,
                                  name: session.user.name,
                                  avatar: session.user.image,
                              },
                          })
                        : finding;
                res.status(200).json(result);
            }

            break;
        default:
            res.send('Nothing send from this method');
    }
}
