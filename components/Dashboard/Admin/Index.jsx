import { useContext } from 'react';
import { Container, Button } from 'react-bootstrap';
import { ContextAdmin } from './Context';
import styles from './styles/Index.module.css';

const Index = () => {
  const context = useContext(ContextAdmin);
  const { setIsRole } = context;

  return (
    <div>
      <Container>
        <h1>This is the Admin Page</h1>
        <Button
          className={styles.button}
          variant="outline-primary"
          onClick={() => setIsRole('CreateCategory')}
        >
          Create Category
        </Button>
        <br />
        <Button
          className={styles.button}
          variant="outline-primary"
          onClick={() => setIsRole('All Categories')}
        >
          All Categories
        </Button>
      </Container>
    </div>
  );
};

export default Index;
