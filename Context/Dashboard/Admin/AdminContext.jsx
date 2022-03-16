import { createContext, useState } from 'react';

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [state, setState] = useState({
    name: '',
    message: '',
    buttonText: 'Create',
    image: '',
    alertColor: '',
    statusCode: 0,
  });

  const [content, setContent] = useState('');
  const [imageUploadButtonName, setImageUploadButtonName] =
    useState('Upload image');

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
