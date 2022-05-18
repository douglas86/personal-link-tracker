import { Container } from 'react-bootstrap';

import Image from 'next/image';

import Header from '../../../components/Admin/header.jsx';
import ShowAlert from '../../../components/Admin/alert.jsx';
import AdminApis from '../../../API/index2.jsx';
import Submit from '../../../components/Admin/Submit.jsx';
import styles from '../styles/Read.module.css';

const AllCategories = () => {
  const { Fetcher } = AdminApis();
  const fetching = Fetcher('/api/category');
  const { handleConfirm, handleUpdate } = Submit();

  return (
    <>
      <Header />
      <Container>
        <ShowAlert />
      </Container>
      <div className={styles.flex_container}>
        {fetching !== undefined
          ? Object.entries(fetching.data).map(([k, v]) => (
              <div key={k} className={styles.contents}>
                <div className={styles.flex_image}>
                  <Image
                    className={styles.image}
                    src={`data:image/jpeg;base64,${v.image}`}
                    alt={v.title}
                    width={400}
                    height={270}
                  />
                </div>
                <div className={styles.title}>
                  <h5>{v.title}</h5>
                  <button
                    onClick={() => handleUpdate(v)}
                    className={`btn btn-outline-success ${styles.button}`}
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleConfirm(v)}
                    className={`btn btn-outline-danger ${styles.button}`}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          : null}
      </div>
    </>
  );
};

export default AllCategories;
