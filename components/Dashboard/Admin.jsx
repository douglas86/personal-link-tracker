import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { ContextAdmin } from './Admin/Context';
import CreateCategory from './Admin/CreateCategory';
import Index from './Admin/Index';

const Admin = () => {
    const context = useContext(ContextAdmin);
    const { isRole } = context;
    const router = useRouter();

    const Role = () => {
        switch (isRole) {
            case 'CreateCategory':
                return <CreateCategory />;
            default:
                return <Index />;
        }
    };

    return <>{Role()}</>;
};

export default Admin;
