import { Container, Alert } from 'react-bootstrap';
import { useState, useEffect, useContext } from 'react';
import { useSession } from 'next-auth/react';
import styles from '../../../../public/styles/create.module.css';
import { CreateContext } from '../../PageContext/user/link/CreateContext';

const Create = (props) => {
  const { data: session } = useSession();
  const { response, user } = props;

  const [screenSize, setScreenSize] = useState({
    dynamicWidth: 0,
  });

  const setDimension = () => {
    setScreenSize({
      dynamicWidth: window.innerWidth,
    });
  };

  const context = useContext(CreateContext);
  const {
    postedBy,
    title,
    url,
    type,
    medium,
    categories,
    message,
    alertColor,
    showAlert,
  } = context.state;

  useEffect(() => {
    // updated postedBy user id
    context.setState({ ...context.state, postedBy: user ? user : undefined });

    // After timer closes sets showAlert to false
    if (showAlert) {
      setTimeout(() => {
        context.setState({
          ...context.state,
          showAlert: false,
          buttonText: 'Submit',
        });
      }, 3000);
    }
  }, [showAlert]);

  useEffect(function mount() {
    window.addEventListener('resize', setDimension);
    return function unMount() {
      window.removeEventListener('resize', setDimension);
    };
  });

  const handleToggle = (c) => () => {
    const all = [...categories];
    const clickedCategory = categories.indexOf(c);
    if (clickedCategory === -1) {
      all.push(c);
    } else {
      all.splice(clickedCategory, 1);
    }
    context.setState({ ...context.state, categories: all });
  };

  const showCategories = () => {
    return (
      <>
        {response
          ? response.map((item) => (
              <li className="list-unstyled" key={item.id}>
                <input
                  type="checkbox"
                  name={item.title}
                  className="mr-2"
                  onChange={handleToggle(item.title)}
                />{' '}
                <label className="form-check-label">{item.title}</label>
              </li>
            ))
          : null}
      </>
    );
  };

  const showTypes = () => (
    <>
      <div className="form-check ml-3">
        <label className="form-check-label">
          <input
            type="radio"
            onChange={() =>
              context.setState({ ...context.state, type: 'free' })
            }
            value="free"
            className="form-check-input"
            name="type"
          />{' '}
          Free
        </label>
      </div>
      <div className="form-check ml-3">
        <label className="form-check-label">
          <input
            type="radio"
            onChange={() =>
              context.setState({ ...context.state, type: 'paid' })
            }
            value="paid"
            className="form-check-input"
            name="type"
          />{' '}
          Paid
        </label>
      </div>
    </>
  );
  const showMedium = () => (
    <>
      <div className="form-check ml-3">
        <label className="form-check-label">
          <input
            type="radio"
            onChange={() =>
              context.setState({ ...context.state, medium: 'video' })
            }
            value="video"
            className="form-check-input"
            name="medium"
          />{' '}
          Video
        </label>
      </div>
      <div className="form-check ml-3">
        <label className="form-check-label">
          <input
            type="radio"
            onChange={() =>
              context.setState({ ...context.state, medium: 'book' })
            }
            value="book"
            className="form-check-input"
            name="medium"
          />{' '}
          Book
        </label>
      </div>
    </>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      postedBy,
      title,
      url,
      categories,
      type,
      medium,
    };

    try {
      await fetch('/api/link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then(async (res) => {
        const result = await res.json();
        if (res.status === 200) {
          context.setState({
            ...context.state,
            alertColor: 'success',
            showAlert: true,
            message: result.message,
          });
        } else {
          context.setState({
            ...context.state,
            alertColor: 'danger',
            showAlert: true,
            message: result.message,
          });
        }
      });
    } catch (err) {
      context.setState({
        ...context.state,
        alertColor: 'danger',
        showAlert: true,
        message: err.message,
      });
    }
  };

  const showForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="text-muted">Title</label>
        <input
          type="text"
          onChange={(e) =>
            context.setState({ ...context.state, title: e.target.value })
          }
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="text-muted">URL</label>
        <input
          type="text"
          onChange={(e) =>
            context.setState({ ...context.state, url: e.target.value })
          }
          className="form-control"
        />
      </div>
      <button
        disabled={!session}
        className={`btn btn-outline-warning ${styles.button}`}
        type="submit"
      >
        {session ? 'Post' : 'Login to post'}
      </button>
    </form>
  );

  return (
    <Container className={styles.container}>
      <div className={styles.flex_container}>
        <div className={styles.flex_left}>
          <h1>Submit Link/URL</h1>
          <label className="text-muted ml-4">Categories</label>
          <ul
            style={{
              maxHeight: '100px',
              overflowY: 'scroll',
              listStyle: 'none',
              paddingLeft: 0,
              width: screenSize.dynamicWidth < 800 ? '50%' : '200px',
              margin:
                screenSize.dynamicWidth < 800 && screenSize.dynamicWidth > 0
                  ? '1% 25%'
                  : '0%',
            }}
          >
            {showCategories()}
          </ul>
          <div className="form-group">
            <label className="text-muted ml-4">Type</label>
            {showTypes()}
          </div>
          <div className="form-group">
            <label className="text-muted ml-4">Medium</label>
            {showMedium()}
          </div>
        </div>
        <div className={styles.flex_right}>
          {showAlert && message ? (
            <Alert
              style={{ marginTop: '5px' }}
              variant={alertColor}
              onClose={() =>
                context.setState({ ...context.state, showAlert: false })
              }
              dismissible
            >
              <Alert.Heading>{message}</Alert.Heading>
            </Alert>
          ) : null}
          {showForm()}
        </div>
      </div>
    </Container>
  );
};

export default Create;
