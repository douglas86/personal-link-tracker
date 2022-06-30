import { getSession } from "next-auth/react";
import prisma from "../lib/prisma";
import { titles } from "../components/atom/titles";
import { links } from "../components/atom/links";
import { Button } from "react-bootstrap";

const Dashboard = ({ data }) => {
  console.log("data", JSON.parse(data));

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

export const getServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  const data = await prisma.user.findMany({
    where: { name: session?.user.name },
  });

  return { props: { data: JSON.stringify(data) } };
};

export default Dashboard;
