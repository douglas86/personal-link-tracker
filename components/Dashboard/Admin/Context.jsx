import { useState, createContext } from 'react';

export const ContextAdmin = createContext();

export const ProviderAdmin = ({ children }) => {
    const [isComponent, setIsComponent] = useState('Admin');
    const [showAlert, setShowAlert] = useState(false);
    const [message, setMessage] = useState();
    const [variant, setVariant] = useState();
    return (
        <ContextAdmin.Provider
            value={{
                isComponent,
                setIsComponent,
                showAlert,
                setShowAlert,
                message,
                setMessage,
                variant,
                setVariant,
            }}
        >
            {children}
        </ContextAdmin.Provider>
    );
};
