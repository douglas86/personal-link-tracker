import Resizer from 'react-image-file-resizer';
import { useContext } from 'react';
import 'react-quill/dist/quill.bubble.css';
import { AdminContext } from '../../Context/Dashboard/Admin/AdminContext';
import Apis from '../../API';

const Submit = () => {
  const context = useContext(AdminContext);
  const { state, content } = context;
  const { name, image, description } = state;

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = { name, content, image };
    if (name !== '' && content !== '' && image !== '') {
      Posting('/api/category', body);
      context.setState({ ...state, buttonText: 'Creating' });
    } else {
      alert('You have not finished filling out the form');
    }
  };

  const handleChange = (name) => (e) => {
    context.setState({
      ...context.state,
      [name]: e.target.value,
      message: '',
    });
  };

  const handleContent = (e) => {
    context.setContent(e);
  };

  const handleConfirm = (body) => {
    let answer = window.confirm('Are you sure you want to delete');
    if (answer) {
      handleDelete(body);
    }
  };

  const handleDelete = async (body) => {
    Deleting('/api/category', body);
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

  const handleUpdate = (data) => {
    const { id, title, description, image } = data;

    context.setState({
      ...state,
      id,
      title,
      description,
      buttonText: 'Update',
      image,
      isUpdateState: true,
    });
  };

  console.log('state', context);

  return {
    handleConfirm,
    handleSubmit,
    handleChange,
    handleContent,
    handleImage,
    handleUpdate,
  };
};

export default Submit;
