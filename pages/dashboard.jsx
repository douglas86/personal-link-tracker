import { getSession, useSession } from 'next-auth/react';
import prisma from '../lib/prisma';

import Admin from '../components/Dashboard/Admin';
import Subscriber from '../components/Dashboard/Subscriber';

const Dashboard = ({ user }) => {
    const { data: session } = useSession();

    const Role = (role) => {
        switch (role) {
            case 'admin':
                return <Admin />;
            default:
                return <Subscriber />;
        }
    };
    return (
        <>
            {user && session ? Role(user.role) : <h1>You are not logged in</h1>}
        </>
    );
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

    return {
        props: {
            user: JSON.stringify(user),
        },
    };
};

export default Dashboard;
