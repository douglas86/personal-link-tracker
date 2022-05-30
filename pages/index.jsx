import { GetRoute } from '../API/index2';
import { Cards } from '../components/organism/Cards';

import styles from '../public/static/styles/index.module.css';

const Home = () => {
    const fetcher = GetRoute('/api/category').data;

    return (
        <div>
            <h1 className={styles.title}>Browse Tutorial/Courses</h1>
            <div className={styles.flex_container}>
                {fetcher !== undefined
                    ? Object.entries(fetcher).map(([key, value]) => (
                          <div key={key}>
                              {Cards(
                                  `/links/${value.title}`,
                                  `data:image/jpeg;base64,${value.image}`,
                                  250,
                                  180,
                                  value.title
                              )}
                          </div>
                      ))
                    : null}
            </div>
        </div>
    );
};

export default Home;
