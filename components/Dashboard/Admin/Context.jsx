import { useState, createContext } from 'react';

export const ContextAdmin = createContext();

export const ProviderAdmin = ({ children }) => {
    const [component, setComponent] = useState();
    return (
        <ContextAdmin.Provider value={{ component, setComponent }}>
            {children}
        </ContextAdmin.Provider>
    );
};
