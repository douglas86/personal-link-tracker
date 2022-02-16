import { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { ContextAdmin } from './Context';

const Index = () => {
    const comp = useContext(ContextAdmin);

    return (
        <div>
            <h1>This is the Admin Page</h1>
            <Button
                variant="outline-primary"
                onClick={() => comp.setIsComponent('CreateCategory')}
            >
                Create Category
            </Button>
        </div>
    );
};

export default Index;
