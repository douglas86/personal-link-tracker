import { useContext } from 'react';
import { Container, Alert } from 'react-bootstrap';

import Link from 'next/link';
import { useSession } from 'next-auth/react';

import styles from './styles/index.module.css';
import { SubscriberContext } from '../../Context/Dashboard/Subscriber/SubscriberContext.jsx';

const Subscriber = () => {
  const { data: session } = useSession();
  const context = useContext(SubscriberContext);

  const { alert, loadComponent } = context;

  console.log('alert', alert);

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
            {alert.showAlert ? (
              <Alert variant={alert.alertColor}>
                <p>{alert.message}</p>
              </Alert>
            ) : null}
            {loadComponent}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Subscriber;
