import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Container, Alert, Button } from 'react-bootstrap';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';

import styles from './styles/index.module.css';

const Subscriber = () => {
  const { data: session } = useSession();

  const [allLinks, setAllLinks] = useState();
  const [skip, setSkip] = useState(0);
  const [leng, setLeng] = useState(0);

  useEffect(async () => {
    const response = await axios.get('/api/pagination');
    setAllLinks(response.data.data);
    setLeng(response.data.leng);
  }, []);

  const loadMore = async () => {
    let toSkip = skip + 3;
    const response = await axios.post('/api/pagination', {
      skip: toSkip,
      slug: 'none',
    });
    setAllLinks([...allLinks, ...response.data.data]);
    setSkip(toSkip);
  };

  const handleDelete = async (id) => {
    let answer = window.confirm('Are you sure you want to delete');
    if (answer) {
      await axios.delete('/api/link', { data: { id } }).then(() => {
        window.location.reload();
      });
    }
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
          <Button variant="primary">Update</Button>
        </Alert>
      </div>
    ));

  return (
    <div>
      <Container>
        <h1 className={styles.heading}>
          This is {session.user.name}'s Dashboard
        </h1>
        <hr />
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
      </Container>
    </div>
  );
};

export default Subscriber;
