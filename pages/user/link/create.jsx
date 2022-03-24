import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';

import prisma from '../../../lib/prisma';
import createHelpers from '../../../Helper/pages/user/link/createHelpers';
import styles from '../../../public/static/styles/create.module.css';

const create = (props) => {
  const categories = JSON.parse(props.result);
  const { showCategories, showTypes } = createHelpers(categories);
  // console.log('categories', categories);

  const [screenSize, setScreenSize] = useState({
    dynamicWidth: 0,
  });

  const setDimension = () => {
    setScreenSize({
      dynamicWidth: window.innerWidth,
    });
  };

  useEffect(function mount() {
    window.addEventListener('resize', setDimension);
    return function unMount() {
      window.removeEventListener('resize', setDimension);
    };
  });

  const showMedium = () => (
    <>
      <div className="form-check ml-3">
        <label className="form-check-label">
          <input
            type="radio"
            value="video"
            className="form-check-input"
            name="medium"
          />{' '}
          Video
        </label>
      </div>
      <div className="form-check ml-3">
        <label className="form-check-label">
          <input
            type="radio"
            value="book"
            className="form-check-input"
            name="medium"
          />{' '}
          Book
        </label>
      </div>
    </>
  );

  return (
    <Container>
      <div className={styles.flex_container}>
        <div className={styles.flex_left}>
          <h1>Submit Link/URL</h1>
          <label className="text-muted ml-4">Categories</label>
          <ul
            style={{
              maxHeight: '100px',
              overflowY: 'scroll',
              listStyle: 'none',
              paddingLeft: 0,
              width: screenSize.dynamicWidth < 800 ? '50%' : '200px',
              margin:
                screenSize.dynamicWidth < 800 && screenSize.dynamicWidth > 0
                  ? '1% 25%'
                  : '0%',
            }}
          >
            {showCategories()}
          </ul>
          <div className="form-group">
            <label className="text-muted ml-4">Types</label>
            {showTypes()}
          </div>
          <div className="form-group">
            <label className="text-muted ml-4">Medium</label>
            {showMedium()}
          </div>
        </div>
        <div className={styles.flex_right}>
          <h1>Right side</h1>
        </div>
      </div>
    </Container>
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
