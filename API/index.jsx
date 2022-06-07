import { useContext } from 'react';
import actionTypes from '../actionTypes/apiCalls';

import { AlertContext } from '../Context/AlertContext';

const Api = () => {
    const alertContext = useContext(AlertContext);
    const { alerts, setAlert } = alertContext;
    const { show, color, message } = alerts;

    const { deleteActions } = actionTypes();

    const deleteRoute = (endpoint, body) => {
        deleteActions(endpoint, body);
    };

    return {
        deleteRoute,
    };
};

export default Api;
