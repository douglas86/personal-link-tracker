import { useState, createContext } from 'react';

export const ContextAdmin = createContext();

export const ProviderAdmin = ({ children }) => {
  const [isRole, setIsRole] = useState('Admin');
  const [inputs, setInputs] = useState({
    name: '',
    description: '',
    image: '',
  });
  const [state, setState] = useState({
    file: '',
    message: '',
    buttonText: 'Submit',
    showAlert: false,
    alertColor: '',
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
