import { createContext, useState, useEffect } from 'react';

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [state, setState] = useState({
    id: '',
    title: '',
    description: '',
    message: '',
    buttonText: 'Create',
    image: '',
    alertColor: '',
    statusCode: 0,
    showAlert: false,
    isUpdateState: false,
  });

  const { showAlert } = state;

  const [content, setContent] = useState('');
  const [imageUploadButtonName, setImageUploadButtonName] =
    useState('Upload image');

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
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
