import { useContext } from "react";
import { ContextAdmin } from "../Context";
import Resizer from "react-image-file-resizer";

const Handler = () => {
  const context = useContext(ContextAdmin);

  const { state, setState } = context;
  const { file } = state;

  const handleSubmission = async (data) => {
    const { title, description } = data;
    const handleSubmission = { title, description, file };
    await fetch("/api/AWS/s3", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(handleSubmission),
    }).then(async (res) => {
      let result = await res.json();
      setState({
        ...state,
        message: result.message,
        showAlert: true,
        alertColor: "success",
      });
    });
  };

  const handleImage = async (image) => {
    let fileInput = false;
    if (event.target.files[0]) {
      fileInput = true;
    }
    if (fileInput) {
      try {
        Resizer.imageFileResizer(
          event.target.files[0],
          300,
          300,
          "JPEG",
          100,
          0,
          (uri) => {
            setState({
              ...state,
              file: uri,
            });
          },
          "base64",
          200,
          200
        );
      } catch (err) {
        setState({
          ...state,
          message: err.message,
          showAlert: true,
          alertColor: "danger",
        });
      }
    }
  };

  return {
    handleImage,
    handleSubmission,
  };
};

export default Handler;
