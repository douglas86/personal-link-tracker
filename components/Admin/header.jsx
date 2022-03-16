import { Container } from 'react-bootstrap';
import styles from './header.module.css';

const Header = () => {
  return (
    <Container>
      <h1 className={styles.h1}>Admin Dashboard</h1>
    </Container>
  );
};

export default Header;
