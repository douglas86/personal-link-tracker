import { useEffect, useContext } from 'react';
import { Tabs, Tab } from 'react-bootstrap';

// Context
// import { AdminContext } from '../../Context/Dashboard/Admin/AdminContext';
import { AdminContext } from '../../Context/AdminContext';

// Tabs
import CreateCategory from '../organism/AdminTabs/CreateCategory';
import AllCategories from '../organism/AdminTabs/AllCategories';
import UpdateCategory from '../organism/AdminTabs/UpdateCategory';
import ReadLinks from '../organism/AdminTabs/ReadLinks';
import { AlertProvider } from '../../Context/AlertContext';

const AdminTemplate = () => {
    const { isTab, setIsTab } = useContext(AdminContext);

    return (
        <>
            <AlertProvider>
                <Tabs
                    id="uncontrolled-tab-example"
                    activeKey={isTab}
                    onSelect={(k) => setIsTab(k)}
                    className="mb-3"
                >
                    {isTab !== 'update' ? (
                        <Tab eventKey="create" title="Create Category">
                            <CreateCategory />
                        </Tab>
                    ) : null}
                    <Tab eventKey="all" title="All Categories">
                        <AllCategories />
                    </Tab>
                    {isTab !== 'create' ? (
                        <Tab eventKey="update" title="Update Category">
                            <UpdateCategory />
                        </Tab>
                    ) : null}
                    <Tab eventKey="links" title="Links">
                        <ReadLinks />
                    </Tab>
                </Tabs>
            </AlertProvider>
        </>
    );
};

export default AdminTemplate;
