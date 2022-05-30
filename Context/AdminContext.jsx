import { createContext, useState, useEffect } from 'react';

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    const [showAlert, setShowAlert] = useState(false);
    const [isTab, setIsTab] = useState('all');

    useEffect(() => {
        if (showAlert) {
            setTimeout(() => setShowAlert(false), 5000);
        }
    }, [showAlert]);

    return (
        <AdminContext.Provider
            value={{ showAlert, setShowAlert, isTab, setIsTab }}
        >
            {children}
        </AdminContext.Provider>
    );
};
