import { createContext, useState } from "react";

export const HomeContext = createContext();

export const HomeProvider = ({ children }) => {
  const [categoryTitle, setCategoryTitle] = useState("Home");
  return (
    <HomeContext.Provider value={{ categoryTitle, setCategoryTitle }}>
      {children}
    </HomeContext.Provider>
  );
};
