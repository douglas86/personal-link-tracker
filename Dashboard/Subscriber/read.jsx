import { useContext } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { Button, Alert } from 'react-bootstrap';

import styles from './styles/index.module.css';
import onSubmit from './onSubmit.jsx';
import { SubscriberContext } from '../../Context/Dashboard/Subscriber/SubscriberContext.jsx';
import Update from './update.jsx';

const Read = () => {
  const context = useContext(SubscriberContext);
  const { setState, allLinks, skip, leng, setLoadComponent } = context;
  const { loadMore, handleDelete } = onSubmit();

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
              <p style={{ marginLeft: '50px' }}>Category:</p>
              {item.categoryNames.map((value, index) => (
                <div key={index}>
                  <p style={{ marginLeft: '5px' }}>{value}</p>
                </div>
              ))}
            </>
          </div>
          <Button onClick={() => handleDelete(item.id)} variant="danger">
            Delete
          </Button>{' '}
          <Button
            onClick={() => {
              const { id, title, url, medium, type, categoryNames } = item;
              setLoadComponent(<Update />);
              setState({
                id,
                title,
                url,
                medium,
                type,
                categoryNames,
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
  );
};

export default Read;
