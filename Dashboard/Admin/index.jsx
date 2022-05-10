import { useContext, useEffect, useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';

import Create from './Create';
import Read from './Read';
import Update from './Update';

import ReadLinks from './links/Read';

import { AdminContext } from '../../Context/Dashboard/Admin/AdminContext';

const Admin = () => {
  const context = useContext(AdminContext);
  const { state, isTab, setIsTab } = context;
  const { isUpdateState } = state;

  useEffect(() => {
    if (isTab === 'create') {
      context.setContent('');
      context.setState({
        id: '',
        image: '',
        isUpdateState: false,
        title: '',
        buttonText: 'Create',
      });
    }
  }, [isTab]);

  return (
    <>
      <Tabs
        id="uncontrolled-tab-example"
        activeKey={isTab}
        onSelect={(k) => setIsTab(k)}
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
        <Tab eventKey="links" title="Links">
          <ReadLinks />
        </Tab>
      </Tabs>
    </>
  );
};

export default Admin;
