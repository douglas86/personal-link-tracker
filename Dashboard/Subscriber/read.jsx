import { useContext } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';
import { Button, Alert } from 'react-bootstrap';

import Link from 'next/link';

import styles from './styles/index.module.css';
import { SubscriberContext } from '../../Context/Dashboard/Subscriber/SubscriberContext.jsx';

const Read = () => {
  const context = useContext(SubscriberContext);
  const { allLinks, setAllLinks, skip, setSkip, leng } = context;

  const loadMore = async () => {
    let toSkip = skip + 3;
    const response = await axios.post('/api/pagination', {
      skip: toSkip,
      slug: 'none',
    });
    setAllLinks([...allLinks, ...response.data.data]);
    setSkip(toSkip);
  };

  const listOfLinks = () =>
    allLinks.map((item, index) => (
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
            </>
          </div>
          <Button onClick={() => handleDelete(item.id)} variant="danger">
            Delete
          </Button>{' '}
          <Button
            onClick={() => {
              window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth',
              });
            }}
            variant="primary"
          >
            Update
          </Button>
        </Alert>
      </div>
    ));

  return (
    <div>
      <div className={styles.flexbox}>
        <div className={styles.leftSide}>
          <Link href="/user/link/create" passHref>
            <a>Submit a link</a>
          </Link>
          <br />
          <Link href="/user/profile/update" passHref>
            <a>Update a profile</a>
          </Link>
        </div>
        <div className={styles.rightSide}>
          {allLinks !== undefined ? (
            <InfiniteScroll
              pageStart={0}
              loadMore={loadMore}
              hasMore={skip < leng}
              loader={<h4 key={0}>Loading...</h4>}
            >
              {listOfLinks()}
            </InfiniteScroll>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Read;
