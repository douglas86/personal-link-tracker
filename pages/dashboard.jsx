import { getSession, useSession } from "next-auth/react";

import prisma from "../lib/prisma";

import AdminTemplate from "../components/template/AdminTemplate";
import UserTemplate from "../components/template/UserTemplate";

const Dashboard = ({ data }) => {
  const { data: session } = useSession();

  const Template = () => {
    switch (JSON.parse(data)[0].role) {
      case "admin":
        return <AdminTemplate />;
      default:
        return <UserTemplate />;
    }
  };

  return <>{session ? Template() : <h1>You are not signed in</h1>}</>;
};

export const getServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  const data = await prisma.user.findMany({
    where: { name: session?.user.name },
  });

  return {
    props: { data: JSON.stringify(data) },
  };
};

export default Dashboard;
