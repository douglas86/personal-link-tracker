import { useSession } from 'next-auth/react';
import { Container } from 'react-bootstrap';
import axios from 'axios';

import styles from './styles/index.module.css';
import Read from './read';

const Subscriber = () => {
  const { data: session } = useSession();

  const handleDelete = async (id) => {
    let answer = window.confirm('Are you sure you want to delete');
    if (answer) {
      await axios.delete('/api/link', { data: { id } }).then(() => {
        window.location.reload();
      });
    }
  };

  return (
    <div>
      <Container>
        <h1 className={styles.heading}>
          This is {session.user.name}'s Dashboard
        </h1>
        <hr />
        <Read />
      </Container>
    </div>
  );
};

export default Subscriber;
