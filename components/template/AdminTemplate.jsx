import { titles } from "../atom/titles";
import { links } from "../atom/links";
import { Button } from "react-bootstrap";

const AdminTemplate = () => {
  return (
    <>
      <div style={{ marginTop: "5px", textAlign: "center" }}>
        {titles("Admin Dashboard")}
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ margin: "1%" }}>
          {links(
            `/admin/all-links`,
            <a>
              <Button variant="primary">All Links</Button>
            </a>
          )}
        </div>
        <div style={{ margin: "1%" }}>
          {links(
            `/admin/my-links`,
            <a>
              <Button variant="primary">My Links</Button>
            </a>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminTemplate;
