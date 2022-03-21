import { createContext, useState, useEffect } from 'react';

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [state, setState] = useState({
    name: '',
    message: '',
    buttonText: 'Create',
    image: '',
    alertColor: '',
    statusCode: 0,
    showAlert: false,
  });
  const { showAlert } = state;

  const [content, setContent] = useState('');
  const [imageUploadButtonName, setImageUploadButtonName] =
    useState('Upload image');
  const [update, setUpdate] = useState({
    id: '',
    title: '',
    description: '',
    image: '',
  });

  useEffect(() => {
    if (showAlert) {
      setTimeout(() => {
        setState({ ...state, showAlert: false });
      }, 10000);
    }
  }, [showAlert]);

  return (
    <AdminContext.Provider
      value={{
        state,
        setState,
        content,
        setContent,
        imageUploadButtonName,
        setImageUploadButtonName,
        update,
        setUpdate,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
