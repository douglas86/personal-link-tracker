import prisma from '../../../lib/prisma';
import styles from '../../../public/static/styles/create.module.css';

const create = (props) => {
  const result = JSON.parse(props.result);
  console.log('result', result);
  return (
    <div className={styles.flex_container}>
      <div className={styles.flex_left}>
        <h1>Submit Link/URL</h1>
      </div>
      <div className={styles.flex_right}>
        <h1>Right side</h1>
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const Categories = await prisma.category.findMany();
  const result = JSON.stringify(Categories);

  return {
    props: { result },
  };
};

export default create;

// import { CreateProvider } from '../../../components/pages/PageContext/user/link/CreateContext';
// import Create from '../../../components/pages/user/link/Create';
// import { getSession } from 'next-auth/react';
//
// const CreatePage = (props) => {
//   const response = props ? JSON.parse(props.data) : undefined;
//   const user = props ? JSON.parse(props.user).id : undefined;
//   return (
//     <div>
//       <CreateProvider>
//         <Create response={response} user={user} />
//       </CreateProvider>
//     </div>
//   );
// };
//
// export const getServerSideProps = async (ctx) => {
//   const session = await getSession(ctx);
//   const user = session
//     ? await prisma.user.findUnique({
//         where: {
//           email: session.user.email,
//         },
//       })
//     : null;
//   const result = await prisma.category.findMany();
//   const data = JSON.stringify(result);
//   return {
//     props: {
//       data,
//       user: JSON.stringify(user),
//     },
//   };
// };
//
// export default CreatePage;
