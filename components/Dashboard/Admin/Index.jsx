import { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { ContextAdmin } from './Context';

const Index = () => {
  const context = useContext(ContextAdmin);
  const { setIsRole } = context;

  return (
    <div>
      <h1>This is the Admin Page</h1>
      <Button
        variant="outline-primary"
        onClick={() => setIsRole('CreateCategory')}
      >
        Create Category
      </Button>
    </div>
  );
};

export default Index;
