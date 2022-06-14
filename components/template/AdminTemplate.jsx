import { useContext } from "react";
import { Tabs, Tab } from "react-bootstrap";

// Context
import { AdminContext } from "../../Context/AdminContext";

// Tabs
import UpdateCategory from "../organism/AdminTabs/UpdateCategory";
import ReadLinks from "../organism/AdminTabs/ReadLinks";
import { AlertProvider } from "../../Context/AlertContext";
import Home2 from "./AdminTabs/Home2";
import CreateCategory2 from "./AdminTabs/CreateCategory2";

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
          {isTab !== "update" ? (
            <Tab eventKey="create" title="Create Category">
              <CreateCategory2 />
            </Tab>
          ) : null}
          <Tab eventKey="home" title="All Categories">
            <Home2 />
          </Tab>
          {isTab !== "create" ? (
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
