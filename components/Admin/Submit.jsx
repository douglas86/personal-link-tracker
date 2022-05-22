import Resizer from 'react-image-file-resizer';
import { useContext } from 'react';
import { AdminContext } from '../../Context/Dashboard/Admin/AdminContext';
// import Apis from '../../API';
import AdminApis from '../../API/index2';

const Submit = () => {
  const context = useContext(AdminContext);
  const { Posting, Putting, Deleting } = AdminApis();
  const { state, content, isTab } = context;
  const { title, image, id } = state;

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = { title, content, image, id };
    if (isTab === 'create') {
      if (title !== '' && content !== '' && image !== '') {
        Posting('/api/category', body);
        context.setState({ ...state, buttonText: 'Creating' });
      } else {
        alert('You have not finished filling out the form');
      }
    } else {
      Putting('/api/category', body);
      context.setState({ ...state, buttonText: 'Updating' });
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
    console.log('handleContent', e);
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

    context.setContent(description);

    context.setState({
      ...state,
      id,
      title,
      buttonText: 'Update',
      image,
      isUpdateState: true,
    });

    context.setIsTab('update');
  };

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
