import { useContext } from 'react';

import Api from '../../API';

import { AdminContext } from '../../Context/AdminContext';

const Handler = () => {
    const { deleteRoute } = Api();

    const {
        isTab,
        setIsTab,
        setIsUpdatedTab,
        isForm,
        setIsForm,
        content,
        setContent,
    } = useContext(AdminContext);

    const handleUpdate = (id, title, description, image) => {
        setIsTab('update');
        setIsUpdatedTab(true);
        setIsForm({ title, image, buttonText: 'Update' });
        setContent(description);
    };

    const handleConfirm = (body) => {
        let answer = window.confirm('Are you sure you want to delete');
        if (answer) {
            handleDelete(body);
        }
    };

    const handleDelete = (body) => deleteRoute('/api/category', body);

    return {
        handleUpdate,
        handleConfirm,
    };
};

export default Handler;
