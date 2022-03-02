import { createContext, useState } from 'react';

export const CreateContext = createContext();

export const CreateProvider = ({ children }) => {
  const [state, setState] = useState({
    postedBy: '',
    title: '',
    url: '',
    type: '',
    medium: '',
    categories: [],
    message: '',
    alertColor: '',
    showAlert: false,
  });
  return (
    <CreateContext.Provider value={{ state, setState }}>
      {children}
    </CreateContext.Provider>
  );
};
