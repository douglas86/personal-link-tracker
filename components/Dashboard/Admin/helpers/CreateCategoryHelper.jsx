import { useContext } from "react";
import { ContextAdmin } from "../Context";
import { useForm } from "react-hook-form";
import { resolve } from "bluebird";

const Handler = () => {
  const context = useContext(ContextAdmin);
  const {
    setMessage,
    setShowAlert,
    setVariant,
    inputs,
    setInputs,
    state,
    setState,
  } = context;

  const { reset } = useForm();

  const handleSubmission = async (data) => {
    const { name, description } = data;
    try {
      fetch("/api/AWS/s3", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          name,
          description,
          image: state.file,
        }),
      }).then(async (res) => {
        let result = await res.json();
        setState({
          ...state,
          message: result.message,
          showAlert: true,
          alertColor: "success",
        });
      });
    } catch (err) {
      console.log("err", err);
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleFileUpload = async (file) => {
    const files = file.target.files[0];
    const base64 = await convertToBase64(files);
    setState({ ...state, file: base64 });
  };

  return {
    handleSubmission,
    handleFileUpload,
  };
};

export default Handler;
