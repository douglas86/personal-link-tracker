import { Container, Tabs, Tab } from 'react-bootstrap';
import styles from './styles/index.module.css';

import Header from '../../components/Admin/header';

import Create from './Create';
import Read from './Read';

const Admin = () => {
  return (
    <>
      <Tabs
        defaultActiveKey="create"
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
