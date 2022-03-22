import { useContext, useEffect, useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';

import Create from './Create';
import Read from './Read';
import Update from './Update';

import { AdminContext } from '../../Context/Dashboard/Admin/AdminContext';

const Admin = () => {
  const context = useContext(AdminContext);
  const { state } = context;
  const { isUpdateState } = state;
  const [key, setKey] = useState('all');

  useEffect(() => {
    if (key === 'create') {
      context.setContent('');
      context.setState({
        id: '',
        image: '',
        isUpdateState: false,
        title: '',
        buttonText: 'Create',
      });
    }
  }, [key]);

  return (
    <>
      <Tabs
        id="uncontrolled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
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
