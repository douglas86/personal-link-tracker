import { useContext } from 'react';

import { AlertContext } from '../Context/AlertContext';

const Api = () => {
    const alertContext = useContext(AlertContext);
    const { alerts, setAlert } = alertContext;
    const { show, color, message } = alerts;

    const deleteRoute = (endpoint, id) => {
        fetch(endpoint, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(id),
        }).then(async (items) => {
            let result = await items.json();
            const { status, message } = result;
            const color = status === 200 ? 'success' : 'danger';
            setAlert({ show: true, color, message });
        });
    };

    return {
        deleteRoute,
    };
};

export default Api;
