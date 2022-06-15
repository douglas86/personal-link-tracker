import { useContext } from "react";
import { Tab, Tabs } from "react-bootstrap";

// Context
import { AdminContext } from "../../Context/AdminContext";

// Tabs
import UpdateCategory from "./AdminTabs/UpdateCategory2";
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
          <Tab eventKey="create" title="Create Category">
            <CreateCategory2 />
          </Tab>
          <Tab eventKey="home" title="All Categories">
            <Home2 />
          </Tab>
          {isTab !== "create" && isTab !== "home" ? (
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
