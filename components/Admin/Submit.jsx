import Resizer from 'react-image-file-resizer';
import { useContext, useEffect, useState } from 'react';
import 'react-quill/dist/quill.bubble.css';
import { AdminContext } from '../../Context/Dashboard/Admin/AdminContext';
// import { Posting } from '../../API';
import Apis from '../../API';

const Submit = () => {
  const context = useContext(AdminContext);
  const { state, content } = context;
  const { name, image } = state;
  const { Posting } = Apis();

  const [show, setShow] = useState(true);
  const [message, setMessage] = useState('');
  const [va, setVa] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = { name, content, image };
    if (name !== '' && content !== '' && image !== '') {
      // Posting('/api/category', body);
      let r = Posting('/api/category', body);
      console.log('r', r);
    } else {
      alert('You have not finished filling out the form');
    }
  };

  console.log('va', va);

  const handleChange = (name) => (e) => {
    context.setState({
      ...context.state,
      [name]: e.target.value,
      message: '',
    });
  };

  const handleContent = (e) => {
    context.setContent(e);
    context.setState({ ...context.state, message: '' });
  };

  const handleImage = (event) => {
    let fileInput = false;
    if (event.target.files[0]) {
      fileInput = true;
    }
    context.setImageUploadButtonName(event.target.files[0].name);
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
            context.setState({
              ...context.state,
              image: uri,
              message: '',
            });
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

  return { handleSubmit, handleChange, handleContent, handleImage };
};

export default Submit;
