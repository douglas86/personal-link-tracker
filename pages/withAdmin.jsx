import { getSession } from 'next-auth/react';
import prisma from '../lib/prisma';

const withAdmin = (Page) => {
  const WithAdmin = (props) => <Page {...props} />;
  WithAdmin.getServerSideProps = async (ctx) => {
    const session = getSession(ctx);
    const user = session
      ? await prisma.user.findUnique({
          where: {
            email: session.user.email,
          },
        })
      : null;
    if (user === null) {
      ctx.res.writeHead(302, {
        Location: '/',
      });
      ctx.res.end();
    } else {
      return {
        ...(Page.getServerSideProps ? await Page.getServerSideProps(ctx) : {}),
        user,
      };
    }
  };
  return WithAdmin;
};

export default withAdmin;
