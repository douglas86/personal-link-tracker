import { createContext, useState, useEffect } from "react";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [isUpdatedTab, setIsUpdatedTab] = useState(false);
  const [isTab, setIsTab] = useState("all");

  const [imageUploadButtonName, setImageUploadButtonName] =
    useState("Upload image");
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

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
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
