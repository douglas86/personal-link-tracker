import { getSession, useSession } from 'next-auth/react';

import prisma from '../lib/prisma';

import Admin from '../Dashboard/Admin';
import Subscriber from '../Dashboard/Subscriber';

import { AdminProvider } from '../Context/Dashboard/Admin/AdminContext';
import { SubscriberProvider } from '../Context/Dashboard/Subscriber/SubscriberContext';

const Dashboard = ({ data }) => {
  const { data: session } = useSession();

  const Role = (role) => {
    switch (role) {
      case 'admin':
        return (
          <AdminProvider>
            <Admin />
          </AdminProvider>
        );
      default:
        return (
          <SubscriberProvider>
            <Subscriber />
          </SubscriberProvider>
        );
    }
  };

  return (
    <>
      {session ? Role(JSON.parse(data).role) : <h1>You are not signed in</h1>}
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
  const data = JSON.stringify(user);
  return { props: { data } };
};

export default Dashboard;
