import dynamic from 'next/dynamic';
import Resizer from 'react-image-file-resizer';
import { useState } from 'react';
import { Container } from 'react-bootstrap';
import 'react-quill/dist/quill.bubble.css';

import Header from '../../components/Admin/header.jsx';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const Create = () => {
  const [state, setState] = useState({
    name: '',
    error: '',
    success: '',
    buttonText: 'Create',
    image: '',
  });

  const [content, setContent] = useState('');

  const [imageUploadButtonName, setImageUploadButtonName] =
    useState('Upload image');

  const { name, error, success, buttonText, image } = state;

  console.log('state', state);
  console.log('content', content);

  const handleChange = (name) => (e) => {
    setState({
      ...state,
      [name]: e.target.value,
      error: '',
      success: '',
    });
  };

  const handleContent = (e) => {
    setContent(e);
    setState({ ...state, success: '', error: '' });
  };

  const handleImage = (event) => {
    let fileInput = false;
    if (event.target.files[0]) {
      fileInput = true;
    }
    setImageUploadButtonName(event.target.files[0].name);
    if (fileInput) {
      try {
        Resizer.imageFileResizer(
          event.target.files[0],
          300,
          300,
          'JPEG',
          100,
          0,
          (uri) => {
            setState({ ...state, image: uri, success: '', error: '' });
          },
          'base64',
          200,
          200
        );
      } catch (err) {
        console.log('err', err);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleForm = () => (
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
        <button style={{ margin: '0.5%' }} className="btn btn-outline-warning">
          {buttonText}
        </button>
      </div>
    </form>
  );

  return (
    <>
      <Container>
        <Header />
        {handleForm()}
      </Container>
    </>
  );
};

export default Create;
