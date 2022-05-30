import { useEffect, useContext } from 'react';
import { Tabs, Tab } from 'react-bootstrap';

// Context
import { AdminContext } from '../../Context/Dashboard/Admin/AdminContext';

// Tabs
import CreateCategory from '../organism/AdminTabs/CreateCategory';
import AllCategories from '../organism/AdminTabs/AllCategories';
import UpdateCategory from '../organism/AdminTabs/UpdateCategory';
import ReadLinks from '../organism/AdminTabs/ReadLinks';

const AdminTemplate = () => {
    const context = useContext(AdminContext);
    const { state, setState, setContent, isTab, setIsTab } = context;
    const { isUpdateState } = state;

    console.log('context', context);

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            setContent('');
            setState({
                id: '',
                image: '',
                isUpdateState: false,
                title: '',
                buttonText: 'Create',
            });
        }

        return () => mounted === false;
    }, [setState, setContent]);

    return (
        <>
            <Tabs
                id="uncontrolled-tab-example"
                activeKey={isTab}
                onSelect={(k) => setIsTab(k)}
                className="mb-3"
            >
                <Tab eventKey="create" title="Create Category">
                    <CreateCategory />
                </Tab>
                <Tab eventKey="all" title="All Categories">
                    <AllCategories />
                </Tab>
                {isUpdateState ? (
                    <Tab eventKey="update" title="Update Category">
                        <UpdateCategory />
                    </Tab>
                ) : null}
                <Tab eventKey="links" title="Links">
                    <ReadLinks />
                </Tab>
            </Tabs>
        </>
    );
};

export default AdminTemplate;
