import PaginationTemplates from "../../components/template/PaginationTemplates";

const AllLinks = ({ data, len }) => {
  return (
    <>
      <PaginationTemplates data={JSON.parse(data)} len={JSON.parse(len)} />
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
