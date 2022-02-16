import { useState, createContext } from 'react';

export const ContextAdmin = createContext();

export const ProviderAdmin = ({ children }) => {
    const [isComponent, setIsComponent] = useState('Admin');
    const [showAlert, setShowAlert] = useState(false);
    const [message, setMessage] = useState();
    const [variant, setVariant] = useState();
    const [inputs, setInputs] = useState({
        name: '',
        description: '',
        image: '',
    });
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
                inputs,
                setInputs,
            }}
        >
            {children}
        </ContextAdmin.Provider>
    );
};
