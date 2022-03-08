import { CreateProvider } from '../../../components/pages/PageContext/user/link/CreateContext';
import Create from '../../../components/pages/user/link/Create';
import { getSession } from 'next-auth/react';

const CreatePage = (props) => {
  const response = props ? JSON.parse(props.data) : undefined;
  const user = props ? JSON.parse(props.user).id : undefined;
  return (
    <div>
      <CreateProvider>
        <Create response={response} user={user} />
      </CreateProvider>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  const user = session
    ? await prisma.user.findUnique({
        where: {
          email: session.user.email,
        },
      })
    : null;
  const result = await prisma.category.findMany();
  const data = JSON.stringify(result);
  return {
    props: {
      data,
      user: JSON.stringify(user),
    },
  };
};

export default CreatePage;
