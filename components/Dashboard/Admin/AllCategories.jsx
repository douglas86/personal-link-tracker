import { useContext } from 'react';
import { Container, Button } from 'react-bootstrap';
import useSWR from 'swr';

import { ContextAdmin } from './Context';
import styles from '../../../public/styles/index.module.css';

const AllCategories = () => {
  const context = useContext(ContextAdmin);
  const { setIsRole, state, setState } = context;

  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data } = useSWR('/api/AWS/s3', fetcher);

  console.log('data', data);

  return (
    <div>
      <Container>
        <h1>This is all categories</h1>
        <Button
          style={{ marginTop: '10px' }}
          variant="outline-info"
          size="lg"
          onClick={() => setIsRole('Admin')}
        >
          Admin Dashboard
        </Button>
        <div className={styles.flex_container}>
          {data !== undefined
            ? Object.entries(data.contents).map(([k, v]) => (
                <button
                  key={k}
                  className={styles.button}
                  onClick={() =>
                    context.setState({
                      component: 'Card',
                      categoryTitle: v.title.split('.')[0],
                      image: v.image,
                    })
                  }
                >
                  <div className={styles.contents}>
                    <div className={styles.flex_image}>
                      <img
                        className={styles.image}
                        src={`data:image/jpeg;base64,${v.image}`}
                        alt={v.title}
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
      </Container>
    </div>
  );
};

export default AllCategories;
