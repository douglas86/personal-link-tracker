import { useContext } from 'react';
import { Tabs, Tab } from 'react-bootstrap';

import Create from './Create';
import Read from './Read';
import Update from './Update';

import { AdminContext } from '../../Context/Dashboard/Admin/AdminContext';

const Admin = () => {
  const context = useContext(AdminContext);
  const { state } = context;
  const { isUpdateState } = state;

  return (
    <>
      <Tabs
        defaultActiveKey="all"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="create" title="Create Category">
          <Create />
        </Tab>
        <Tab eventKey="all" title="All Categories">
          <Read />
        </Tab>
        {isUpdateState ? (
          <Tab eventKey="update" title="Update Category">
            <Update />
          </Tab>
        ) : null}
      </Tabs>
    </>
  );
};

export default Admin;
