import prisma from '../lib/prisma';

const withUser = (props) => {
  console.log('props', props);
  return props;
};

export const getServerSideProps = async () => {
  const Prisma = await prisma.links.findMany({});
  console.log('Prisma', Prisma);
  return {
    props: { data: Prisma },
  };
};

export default withUser;
