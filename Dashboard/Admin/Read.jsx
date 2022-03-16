import Image from 'next/image';

import Header from '../../components/Admin/header';
import Apis from '../../API';
import Submit from '../../components/Admin/Submit';
import styles from './styles/Read.module.css';

const Read = () => {
  const { Fetcher } = Apis();
  const fetching = Fetcher('/api/category');
  const { handleConfirm } = Submit();

  return (
    <>
      <Header />
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
                <h5>{v.title.split('.')[0].split('/')[1]}</h5>
                <button className={`btn btn-outline-success ${styles.button}`}>
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
    </>
  );
};

export default Read;
