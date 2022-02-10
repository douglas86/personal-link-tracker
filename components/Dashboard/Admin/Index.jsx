import { useContext } from 'react';
import { ContextAdmin } from './Context';

const Index = () => {
    const comp = useContext(ContextAdmin);
    return (
        <div>
            <h1>This is the admin page</h1>
            <h4>This is the index page</h4>
            <button onClick={() => comp.setIsComponent('CreateCategory')}>
                Click me
            </button>
        </div>
    );
};

export default Index;
