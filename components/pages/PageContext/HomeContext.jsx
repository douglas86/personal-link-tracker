import { createContext, useState } from 'react';

export const HomeContext = createContext();

export const HomeProvider = ({ children }) => {
  const [state, setState] = useState({
    component: 'Home',
    categoryTitle: '',
    image: '',
  });
  return (
    <HomeContext.Provider value={{ state, setState }}>
      {children}
    </HomeContext.Provider>
  );
};
