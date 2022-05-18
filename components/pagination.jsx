import { useState, useEffect } from 'react';
import InfinteScroll from 'react-infinite-scroller';
import { Alert, Spinner } from 'react-bootstrap';

import { pagination } from '../API/index2.jsx';
import styles from '../public/static/styles/[slug].module.css';

// Description of component
// takes in a user as props only need to pass true
// only pass in user={true}
// if you are wanting to grab info based on that user

const Pagination = ({ user, slug }) => {
  const [skip, setSkip] = useState(0);
  const [link, setLink] = useState();
  const [len, setLen] = useState();

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      pagination(`/api/pagination?skip=0&user=${user}&slug=${slug}`).then(
        (items) => {
          setLink(items.data);
          setLen(items.len);
        }
      );
    }

    return () => (mounted = false);
  }, []);

  const loadMore = async () => {
    let toSkip = skip + 2;
    pagination(`/api/pagination?skip=${toSkip}&user=${user}&slug=${slug}`).then(
      (items) => {
        setLink([...link, ...items.data]);
        setSkip(toSkip);
      }
    );
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
        hasMore={skip <= len}
        loader={
          <Spinner animation="border" role="status" key={0}>
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        }
      >
        {listOfLinks() !== undefined ? (
          listOfLinks()
        ) : (
          <Spinner animation="border" role="status" key={0}>
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
      </InfinteScroll>{' '}
    </div>
  );
};

export default Pagination;
