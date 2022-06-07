import { createContext, useState, useEffect } from 'react';

export const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
    const [alerts, setAlert] = useState({
        show: false,
        color: '',
        message: '',
    });
    const { show, color, message } = alerts;

    useEffect(() => {
        if (show) {
            setTimeout(
                () => setAlert({ show: false, color: '', message: '' }),
                5000
            );
        }
    }, [alerts, show]);

    return (
        <AlertContext.Provider value={{ alerts, setAlert }}>
            {children}
        </AlertContext.Provider>
    );
};
