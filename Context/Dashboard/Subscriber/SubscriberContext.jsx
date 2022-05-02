import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

import Read from '../../../Dashboard/Subscriber/read.jsx';

export const SubscriberContext = createContext();

export const SubscriberProvider = ({ children }) => {
  const [state, setState] = useState({
    id: '',
    title: '',
    url: '',
    medium: '',
    type: '',
    categoryNames: [],
  });

  const [alert, setAlert] = useState({
    showAlert: false,
    message: '',
    alertColor: '',
  });

  const [allLinks, setAllLinks] = useState();
  const [skip, setSkip] = useState(0);
  const [leng, setLeng] = useState(0);

  const [loadComponent, setLoadComponent] = useState(<Read />);

  useEffect(async () => {
    const response = await axios.get('/api/pagination');
    setAllLinks(response.data.data);
    setLeng(response.data.leng);
  }, []);

  useEffect(async () => {
    if (alert.showAlert) {
      const response = await axios.get('/api/pagination');
      setAllLinks(response.data.data);
      setTimeout(() => {
        setAlert({ ...alert, showAlert: false });
      }, 5000);
    }
  }, [alert]);

  return (
    <SubscriberContext.Provider
      value={{
        state,
        setState,
        alert,
        setAlert,
        allLinks,
        setAllLinks,
        skip,
        setSkip,
        leng,
        setLeng,
        loadComponent,
        setLoadComponent,
      }}
    >
      {children}
    </SubscriberContext.Provider>
  );
};
