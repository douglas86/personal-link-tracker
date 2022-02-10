import { useContext } from 'react';
import { ContextAdmin } from './Context';

const CreateCategory = () => {
    const comp = useContext(ContextAdmin);

    return (
        <div>
            <h3>This is the CreateCategory page</h3>
            <button onClick={() => comp.setIsComponent('Admin')}>
                Click me
            </button>
        </div>
    );
};

export default CreateCategory;
