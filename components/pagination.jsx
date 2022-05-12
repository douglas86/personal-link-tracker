import { useState, useEffect } from 'react';
import InfinteScroll from 'react-infinite-scroller';
import { Alert } from 'react-bootstrap';

import { pagination } from '../API/index2.jsx';
import styles from '../public/static/styles/[slug].module.css';

const Pagination = ({ endpoint, user }) => {
  const [skip, setSkip] = useState(0);
  const [link, setLink] = useState();
  const [len, setLen] = useState();

  useEffect(() => {
    let mounted = true;

    pagination(`${endpoint}?skip=0&user=${user}`).then((items) => {
      if (mounted) {
        setLink(items.data);
        setLen(items.len);
      }
    });
    return () => (mounted = false);
  }, []);

  const loadMore = async () => {
    let toSkip = skip + 2;
    pagination(`${endpoint}?skip=${toSkip}&user=${user}`).then((items) => {
      setLink([...link, ...items.data]);
      setSkip(toSkip);
    });
  };

  const listOfLinks = () =>
    link?.map((item, index) => (
      <div key={index}>
        <Alert variant="primary">
          <Alert.Heading>{item.title}</Alert.Heading>
          <p>{item.url}</p>
          <div className={styles.alert_bottom_flex}>
            <>
              {item.medium === 'Book' ? (
                <p className={styles.alert_p}>Book</p>
              ) : (
                <p>Book/</p>
              )}
              {item.medium === 'Video' ? (
                <p className={styles.alert_p}>Video</p>
              ) : (
                <p>/Video</p>
              )}
              {item.type === 'Free' ? (
                <p style={{ marginLeft: '10px' }} className={styles.alert_p}>
                  Free
                </p>
              ) : (
                <p style={{ marginLeft: '10px' }}>Free/</p>
              )}
              {item.type === 'Paid' ? (
                <p className={styles.alert_p}>Paid</p>
              ) : (
                <p>/Paid</p>
              )}
              <p style={{ marginLeft: '10%' }}>Created by {item.userName}</p>
            </>
          </div>
        </Alert>
      </div>
    ));

  return (
    <div>
      <InfinteScroll
        pageStart={0}
        loadMore={loadMore}
        hasMore={skip - 2 <= len}
        loader={<h4 key={0}>Loading...</h4>}
      >
        {listOfLinks()}
      </InfinteScroll>{' '}
    </div>
  );
};

export default Pagination;
