import { GetRoute } from '../API/index';
import { displayCategory } from '../components/molecule/displayCategory';

import styles from '../public/static/styles/index.module.css';

const Home = () => {
    const fetcher = GetRoute('/api/category').data;

    return (
        <div>
            <h1 className={styles.title}>Browse Tutorial/Courses</h1>
            {fetcher !== undefined
                ? Object.entries(fetcher).map(([key, value]) => (
                      <div key={key} className={styles.flex}>
                          {displayCategory(value)}
                      </div>
                  ))
                : null}
        </div>
    );
};

export default Home;
