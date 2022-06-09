import { useContext } from 'react';

import { AdminContext } from '../../../Context/AdminContext';

import Form from '../Form';

const CreateCategory = () => {
    const { isTab, setIsTab } = useContext(AdminContext);

    console.log('isTab', isTab);

    return (
        <>
            <Form />
        </>
    );
};

export default CreateCategory;
