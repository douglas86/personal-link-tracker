import { useRouter } from "next/router";
import PaginationTemplates from "../../components/template/PaginationTemplates";
import { getSession } from "next-auth/react";

const MyLinks = ({ data, len }) => {
  const router = useRouter().pathname.split("/");

  return (
    <>
      <PaginationTemplates
        data={JSON.parse(data)}
        len={JSON.parse(len)}
        router={router[2]}
      />
    </>
  );
};

export const getServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  const len = await prisma.links.findMany({
    where: { userName: session?.user.name },
  });

  const data = await prisma.links.findMany({
    where: { userName: session?.user.name },
    take: 2,
  });

  return {
    props: { data: JSON.stringify(data), len: JSON.stringify(len.length) },
  };
};

export default MyLinks;
