// import dynamic from 'next/dynamic';
import { useEffect, useContext } from 'react';
import { useQuill } from 'react-quilljs';

import { AdminContext } from '../../Context/Dashboard/Admin/AdminContext';
import Submit from '../../components/Admin/Submit';
import 'quill/dist/quill.snow.css';
// import 'react-quill/dist/quill.bubble.css';

// const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const Form = () => {
  const { handleSubmit, handleChange, handleContent, handleImage } = Submit();
  const context = useContext(AdminContext);
  const { state, content, imageUploadButtonName } = context;
  const { title, buttonText } = state;
  const { quill, quillRef } = useQuill();

  useEffect(() => {
    if (quill) {
      quill.on('text-change', (delta, oldDelta, source) => {
        handleContent(quillRef.current.firstChild.innerHTML);
      });
    }
  }, [quill, quillRef]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input
            onChange={handleChange('title')}
            value={title}
            placeholder="Category title goes here ..."
            type="text"
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <div style={{ height: '100px', marginBottom: '50px' }}>
            <div ref={quillRef} />
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
            onClick={handleSubmit}
          >
            {buttonText}
          </button>
        </div>
      </form>
    </>
  );
};

export default Form;

// <div className="form-group">
//   <label className="text-muted">Content</label>
//   <ReactQuill
//     onChange={handleContent}
//     value={content}
//     placeholder="Write something ..."
//     theme="bubble"
//     className="pb-5 mb-3"
//     style={{ border: '1px solid #666' }}
//   />
// </div>;
