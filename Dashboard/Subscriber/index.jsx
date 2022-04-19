import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Container } from 'react-bootstrap';
import axios from 'axios';

import styles from './styles/index.module.css';

const Subscriber = () => {
  const { data: session } = useSession();

  const [skip, setSkip] = useState(0);
  const [allLinks, setAllLinks] = useState();

  useEffect(async () => {
    const response = await axios.post('/api/pagination', {
      skip,
      slug: 'none',
    });
    setAllLinks(response.data.data);
    setSkip(3);
  }, []);

  console.log('allLinks', allLinks);
  console.log('skip', skip);

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
            <h1>This is the right</h1>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Subscriber;
