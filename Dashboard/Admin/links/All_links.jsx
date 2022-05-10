import axios from 'axios';
import { useState, useEffect } from 'react';
import InfinteScroll from 'react-infinite-scroller';
import { Alert } from 'react-bootstrap';

import styles from '../../../public/static/styles/[slug].module.css';

const All_links = () => {
  const [skip, setSkip] = useState(0);
  const [link, setLink] = useState();
  const [len, setLen] = useState(2);

  useEffect(() => {
    fetch('/api/data?skip=0').then(async (res) => {
      let result = await res.json();
      setLink(result.data);
    });
  }, []);

  const loadMore = async () => {
    let toSkip = skip + 2;
    const response = await axios.get(`/api/data?skip=${toSkip}`);
    setLink([...link, ...response.data.data]);
    setSkip(toSkip);
    setLen(response.data.data.length);
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
      <p>This is for all links</p>
      <InfinteScroll
        pageStart={0}
        loadMore={loadMore}
        hasMore={len === 2}
        loader={<h4 key={0}>Loading...</h4>}
      >
        {listOfLinks()}
      </InfinteScroll>
    </div>
  );
};

export default All_links;
