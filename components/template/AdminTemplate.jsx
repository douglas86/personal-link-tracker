import { useContext } from "react";
import { Tab, Tabs } from "react-bootstrap";

// Context
import { AdminContext } from "../../Context/AdminContext";

// Tabs
import UpdateCategory from "./AdminTabs/UpdateCategory";
import { AlertProvider } from "../../Context/AlertContext";
import Home from "./AdminTabs/Home";
import CreateCategory from "./AdminTabs/CreateCategory";
import Links from "./AdminTabs/Links";

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
            <CreateCategory />
          </Tab>
          <Tab eventKey="home" title="All Categories">
            <Home />
          </Tab>
          {isTab !== "create" && isTab !== "home" ? (
            <Tab eventKey="update" title="Update Category">
              <UpdateCategory />
            </Tab>
          ) : null}
          <Tab eventKey="links" title="Links">
            <Links />
          </Tab>
        </Tabs>
      </AlertProvider>
    </>
  );
};

export default AdminTemplate;
