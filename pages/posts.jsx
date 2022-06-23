import Content from "../components/Content";

const Posts = ({ data, len }) => {
  return (
    <>
      <Content data={data} len={len} />
    </>
  );
};

export const getServerSideProps = async () => {
  const data = await prisma.links.findMany({ take: 2 });
  const len = await prisma.links.findMany();

  return {
    props: { data: JSON.stringify(data), len: JSON.stringify(len.length) },
  };
};

export default Posts;
