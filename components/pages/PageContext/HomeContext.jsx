import { createContext, useState } from 'react';

export const HomeContext = createContext();

export const HomeProvider = ({ children }) => {
  const [state, setState] = useState({
    component: 'Home',
    categoryTitle: '',
    image: '',
  });
  const [categoryData, setCategoryData] = useState({});
  return (
    <HomeContext.Provider
      value={{ state, setState, categoryData, setCategoryData }}
    >
      {children}
    </HomeContext.Provider>
  );
};
