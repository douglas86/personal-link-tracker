import { createContext, useState, useEffect } from "react";

export const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState({
    show: false,
    color: "",
    message: "",
  });
  const { show } = alerts;

  useEffect(() => {
    if (show) {
      setTimeout(
        () => setAlerts({ show: false, color: "", message: "" }),
        5000
      );
    }
  }, [alerts, show]);

  return (
    <AlertContext.Provider value={{ alerts, setAlerts }}>
      {children}
    </AlertContext.Provider>
  );
};
