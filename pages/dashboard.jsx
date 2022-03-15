import { getSession } from 'next-auth/react';

import prisma from '../lib/prisma';

import Admin from '../Dashboard/Admin';
import Subscriber from '../Dashboard/Subscriber';

const Dashboard = ({ data }) => {
    console.log('data', data);
    const Role = (role) => {
        switch (role) {
            case 'admin':
                return <Admin />;
            default:
                return <Subscriber />;
        }
    };

    return <>{Role(JSON.parse(data).role)}</>;
};

export const getServerSideProps = async (ctx) => {
    const session = await getSession(ctx);
    const user = session
        ? await prisma.user.findUnique({
              where: {
                  email: session.user.email,
              },
          })
        : null;
    const data = JSON.stringify(user);
    return { props: { data } };
};

export default Dashboard;
