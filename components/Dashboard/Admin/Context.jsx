import { useState, createContext } from 'react';

export const ContextAdmin = createContext();

export const ProviderAdmin = ({ children }) => {
    const [isRole, setIsRole] = useState('Admin');
    // const [showAlert, setShowAlert] = useState(false);
    // const [message, setMessage] = useState();
    // const [variant, setVariant] = useState();
    const [inputs, setInputs] = useState({
        name: '',
        description: '',
        image: '',
    });
    const [state, setState] = useState({
        message: '',
        buttonText: 'Submit',
        showAlert: false,
        alertColor: '',
        file: '',
    });
    return (
        <ContextAdmin.Provider
            value={{
                isRole,
                setIsRole,
                inputs,
                setInputs,
                state,
                setState,
            }}
        >
            {children}
        </ContextAdmin.Provider>
    );
};
