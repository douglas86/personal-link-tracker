import { Tabs, Tab } from 'react-bootstrap';

import Create from './Create';
import Read from './Read';

const Admin = () => {
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
      </Tabs>
    </>
  );
};

export default Admin;
