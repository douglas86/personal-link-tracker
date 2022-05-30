import { createContext, useState, useEffect } from 'react';

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    const [isUpdatedTab, setIsUpdatedTab] = useState(false);
    const [isTab, setIsTab] = useState('all');

    const [alert, setAlert] = useState({
        showAlert: false,
        alertColor: '',
        alertMessage: '',
    });

    const [isForm, setIsForm] = useState({
        title: '',
        image: '',
        buttonText: 'Create',
    });
    const [imageUploadButtonName, setImageUploadButtonName] =
        useState('Upload image');
    const [content, setContent] = useState('');

    useEffect(() => {
        if (alert.showAlert) {
            setTimeout(
                () => setShowAlert({ ...alert, showAlert: false }),
                5000
            );
        }
    }, [alert]);

    return (
        <AdminContext.Provider
            value={{
                isUpdatedTab,
                setIsUpdatedTab,
                isTab,
                setIsTab,
                alert,
                setAlert,
                isForm,
                setIsForm,
                imageUploadButtonName,
                setImageUploadButtonName,
                content,
                setContent,
            }}
        >
            {children}
        </AdminContext.Provider>
    );
};
