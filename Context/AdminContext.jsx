import { createContext, useState, useEffect } from "react";

export const AdminContext = createContext(undefined);

export const AdminProvider = ({ children }) => {
  const [isUpdatedTab, setIsUpdatedTab] = useState(false);
  const [isTab, setIsTab] = useState("create");

  const [imageUploadButtonName, setImageUploadButtonName] =
    useState("Upload image");
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const [isForm, setIsForm] = useState({
    id: "",
    title: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    if (isTab !== "update") {
      setContent("");
    }
  }, [isTab]);

  return (
    <AdminContext.Provider
      value={{
        isUpdatedTab,
        setIsUpdatedTab,
        isTab,
        setIsTab,
        imageUploadButtonName,
        setImageUploadButtonName,
        content,
        setContent,
        title,
        setTitle,
        isForm,
        setIsForm,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
