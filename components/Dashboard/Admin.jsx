import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { ContextAdmin } from './Admin/Context';
import CreateCategory from './Admin/CreateCategory';
import Index from './Admin/Index';

const Admin = () => {
    const comp = useContext(ContextAdmin);
    const router = useRouter();

    console.log('comp', comp);

    const isComponent = () => {
        switch (comp.isComponent) {
            case 'CreateCategory':
                return <CreateCategory />;
            default:
                return <Index />;
        }
    };

    // useEffect(() => {
    //     router.reload(window.location.pathname);
    // }, [router]);

    return <>{isComponent()}</>;
};

export default Admin;
