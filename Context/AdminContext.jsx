import { createContext, useState, useEffect } from 'react';

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    const [showAlert, setShowAlert] = useState(false);
    const [isUpdatedTab, setIsUpdatedTab] = useState(false);
    const [isTab, setIsTab] = useState('all');

    const [isForm, setIsForm] = useState({
        title: '',
        image: '',
        buttonText: 'Create',
    });
    const [imageUploadButtonName, setImageUploadButtonName] =
        useState('Upload image');
    const [content, setContent] = useState('');

    useEffect(() => {
        if (showAlert) {
            setTimeout(() => setShowAlert(false), 5000);
        }
    }, [showAlert]);

    return (
        <AdminContext.Provider
            value={{
                showAlert,
                setShowAlert,
                isUpdatedTab,
                setIsUpdatedTab,
                isTab,
                setIsTab,
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
