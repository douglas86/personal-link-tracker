import { Button } from "react-bootstrap";
import { img } from "./image";

export const submitButton = (handleSubmit, Name, variant) => {
  return (
    <div className="form-group" style={{ padding: "10px" }}>
      <Button
        className="justify-content-right"
        variant={variant}
        onClick={handleSubmit}
      >
        {Name}
      </Button>
    </div>
  );
};

export const imageUploadButton = (
  isDragging,
  onImageUpdate,
  dragProps,
  images
) => (
  <>
    <button
      style={{
        width: "100%",
        height: "14.5rem",
        textAlign: "center",
        fontSize: "8rem",
        color: isDragging ? "red" : "black",
        border: isDragging ? "5px red solid" : "1px black solid",
      }}
      onClick={() => onImageUpdate}
      {...dragProps}
    >
      {images === "" ? "+" : img(images, 200, 100)}
    </button>
  </>
);
