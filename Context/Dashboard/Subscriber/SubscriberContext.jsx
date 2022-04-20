import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const SubscriberContext = createContext();

export const SubscriberProvider = ({ children }) => {
  const [state, setState] = useState({});

  const [allLinks, setAllLinks] = useState();
  const [skip, setSkip] = useState(0);
  const [leng, setLeng] = useState(0);

  useEffect(async () => {
    const response = await axios.get('/api/pagination');
    setAllLinks(response.data.data);
    setLeng(response.data.leng);
  }, []);

  return (
    <SubscriberContext.Provider
      value={{
        state,
        setState,
        allLinks,
        setAllLinks,
        skip,
        setSkip,
        leng,
        setLeng,
      }}
    >
      {children}
    </SubscriberContext.Provider>
  );
};
