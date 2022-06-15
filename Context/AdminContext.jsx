import { createContext, useState } from "react";

export const AdminContext = createContext(undefined);

export const AdminProvider = ({ children }) => {
  const [isUpdatedTab, setIsUpdatedTab] = useState(false);
  const [isTab, setIsTab] = useState("home");

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
  const [img, setImg] = useState("");

  // useEffect(() => {
  //   if (isTab !== "update") {
  //     setContent("");
  //   }
  // }, [isTab]);

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
        img,
        setImg,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
