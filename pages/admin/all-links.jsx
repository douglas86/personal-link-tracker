import PaginationTemplates from "../../components/template/PaginationTemplates";
import { useRouter } from "next/router";

const AllLinks = ({ data, len }) => {
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

export const getServerSideProps = async () => {
  const len = await prisma.links.findMany();

  const data = await prisma.links.findMany({ take: 2 });

  return {
    props: { data: JSON.stringify(data), len: JSON.stringify(len.length) },
  };
};

export default AllLinks;
