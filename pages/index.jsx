import Image from 'next/image';
import Apis from '../API';

import styles from '../public/static/styles/index.module.css';

const Home = () => {
  const { Fetcher } = Apis();
  const fetching = Fetcher('/api/AWS/s3');
  return (
    <div>
      <h1 className={styles.title}>Browse Tutorial/Courses</h1>
      <div className={styles.flex_container}>
        {fetching !== undefined
          ? Object.entries(fetching.contents).map(([k, v]) => (
              <button key={k} className={styles.button}>
                <div className={styles.contents}>
                  <div className={styles.flex_image}>
                    <Image
                      className={styles.image}
                      src={`data:image/jpeg;base64,${v.image}`}
                      alt={v.title}
                      width={400}
                      height={200}
                    />
                  </div>
                  <div className={styles.title}>
                    <h5>{v.title.split('.')[0].split('/')[1]}</h5>
                  </div>
                </div>
              </button>
            ))
          : null}
      </div>
    </div>
  );
};

export default Home;
