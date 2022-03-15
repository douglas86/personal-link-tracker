import { createContext, useState } from 'react';

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [state, setState] = useState({});
  return (
    <AdminContext.Provider value={{ state, setState }}>
      {children}
    </AdminContext.Provider>
  );
};
