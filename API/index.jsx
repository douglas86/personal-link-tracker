import { useContext } from 'react';
import actionTypes, { Fetcher } from '../actionTypes/apiCalls';

import { AlertContext } from '../Context/AlertContext';

export const pagination = async (endpoint) => {
    return await fetch(endpoint).then((res) => res.json());
};

export const GetRoute = (endpoint) => {
    return Fetcher(endpoint);
};

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
