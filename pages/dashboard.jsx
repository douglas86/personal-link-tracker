import { useSession } from 'next-auth/react';

import Admin from '../Dashboard/Admin';
import Subscriber from '../Dashboard/Subscriber';

import { spinner } from '../components/atom/spinner';
import { AdminProvider } from '../Context/Dashboard/Admin/AdminContext';
import { SubscriberProvider } from '../Context/Dashboard/Subscriber/SubscriberContext';
import { GetRoute } from '../API/index2';

const Dashboard = () => {
    const { data: session } = useSession();

    const fetcher = GetRoute(`/api/user`).data;

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
            {session ? (
                fetcher === undefined ? (
                    spinner()
                ) : (
                    Role(fetcher[0].role)
                )
            ) : (
                <h1>You are not signed in</h1>
            )}
        </>
    );
};

export default Dashboard;
