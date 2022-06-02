import { getSession } from 'next-auth/react';
import prisma from '../../lib/prisma';

const Handler = async (req, res) => {
    const { method, body } = req;
    const session = await getSession({ req });

    switch (method) {
        case 'GET':
            await prisma.user
                .findMany({ where: { email: session?.email } })
                .then((items) => {
                    res.json({
                        status: 200,
                        data: items,
                    });
                });
            break;
        default:
            break;
    }
};

export default Handler;
