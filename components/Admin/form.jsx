import dynamic from 'next/dynamic';
import { useContext } from 'react';

import { AdminContext } from '../../Context/Dashboard/Admin/AdminContext';
import Submit from '../../components/Admin/Submit';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const Form = () => {
  const { handleSubmit, handleChange, handleContent, handleImage } = Submit();
  const context = useContext(AdminContext);
  const { state, content, imageUploadButtonName } = context;
  const { name, buttonText } = state;
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input
            onChange={handleChange('name')}
            value={name}
            type="text"
            className="form-control"
            required
          />
          <div className="form-group">
            <label className="text-muted">Content</label>
            <ReactQuill
              value={content}
              onChange={handleContent}
              placeholder="Write something ..."
              theme="bubble"
              className="pb-5 mb-3"
              style={{ border: '1px solid #666' }}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="btn btn-outline-secondary">
            {imageUploadButtonName}
            <input
              onChange={handleImage}
              type="file"
              accept="image/*"
              className="form-control"
              hidden
            />
          </label>
        </div>
        <div className="form-group">
          <button
            style={{ margin: '0.5%' }}
            className="btn btn-outline-warning"
          >
            {buttonText}
          </button>
        </div>
      </form>
    </>
  );
};

export default Form;
