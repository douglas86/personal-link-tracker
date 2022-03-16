import { createContext, useState } from 'react';

export const SubscriberContext = createContext();

export const SubscriberProvider = ({ children }) => {
  const [state, setState] = useState({});
  return (
    <SubscriberContext.Provider value={{ state, setState }}>
      {children}
    </SubscriberContext.Provider>
  );
};
