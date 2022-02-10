import { useState, createContext } from 'react';

export const ContextAdmin = createContext();

export const ProviderAdmin = ({ children }) => {
    const [isComponent, setIsComponent] = useState('Admin');
    return (
        <ContextAdmin.Provider value={{ isComponent, setIsComponent }}>
            {children}
        </ContextAdmin.Provider>
    );
};
