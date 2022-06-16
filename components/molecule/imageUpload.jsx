import ImageUploading from "react-images-uploading";
import { imageUploadButton } from "../atom/button";

export const imageUpload = (images, onChange) => (
  <>
    <ImageUploading
      multiple
      value={images}
      onChange={onChange}
      maxNumber="1"
      dataURLKey="data_url"
    >
      {({ onImageUpdate, isDragging, dragProps }) => (
        <div className="upload_image-wrapper">
          {imageUploadButton(isDragging, onImageUpdate, dragProps, images)}
        </div>
      )}
    </ImageUploading>
  </>
);
