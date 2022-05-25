import { useContext, useEffect, useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';

import CreateCategory from './CreateCategoryTab';
import AllCategories from './AllCategoriesTab';
import UpdateCategory from './UpdateCategoriesTab';

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

export default Admin;
