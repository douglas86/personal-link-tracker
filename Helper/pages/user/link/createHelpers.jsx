import { useState } from 'react';
import { useSession } from 'next-auth/react';

import styles from '../../../../public/static/styles/create.module.css';

const createHelpers = (categories) => {
  const [state, setState] = useState({
    category: [],
    type: '',
    medium: '',
    formTitle: '',
    formURL: '',
  });

  const { data: session } = useSession();

  const { category } = state;

  const handleToggle = (c) => () => {
    const all = [...category];
    const clickedCategory = category.indexOf(c);
    if (clickedCategory === -1) {
      all.push(c);
    } else {
      all.splice(clickedCategory, 1);
    }
    setState({ ...state, category: all });
  };

  const showCategories = () => {
    return (
      <>
        {categories
          ? categories.map((item) => (
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
            value="free"
            className="form-check-input"
            onChange={() => setState({ ...state, type: 'Free' })}
            name="type"
          />{' '}
          Free
        </label>
      </div>
      <div className="form-check ml-3">
        <label className="form-check-label">
          <input
            type="radio"
            value="paid"
            className="form-check-input"
            onChange={() => setState({ ...state, type: 'Paid' })}
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
            value="video"
            className="form-check-input"
            onChange={() => setState({ ...state, medium: 'Video' })}
            name="medium"
          />{' '}
          Video
        </label>
      </div>
      <div className="form-check ml-3">
        <label className="form-check-label">
          <input
            type="radio"
            value="book"
            className="form-check-input"
            onChange={() => setState({ ...state, medium: 'Book' })}
            name="medium"
          />{' '}
          Book
        </label>
      </div>
    </>
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('state', state);
  };

  const showForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="text-muted">Title</label>
        <input
          type="text"
          onChange={(e) => setState({ ...state, formTitle: e.target.value })}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="text-muted">URL</label>
        <input
          type="text"
          onChange={(e) => setState({ ...state, formURL: e.target.value })}
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

  return {
    state,
    showCategories,
    showTypes,
    showMedium,
    showForm,
  };
};

export default createHelpers;
