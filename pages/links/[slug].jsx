const Links = ({ category, len, data }) => {
  return (
    <>
      <h1>Links</h1>
    </>
  );
};

export const getServerSideProps = async ({ query }) => {
  const category = await prisma.category.findMany({
    where: { title: query.slug },
  });

  const len = await prisma.links.findMany({
    where: { categoryNames: { hasEvery: [query.slug] } },
  });

  const data = await prisma.links.findMany({
    where: { categoryNames: { hasEvery: [query.slug] } },
    take: 2,
  });

  return {
    props: {
      category: JSON.stringify(category),
      len: JSON.stringify(len.length),
      data: JSON.stringify(data),
    },
  };
};

export default Links;
