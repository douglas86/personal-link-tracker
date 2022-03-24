import { useState } from 'react';

const createHelpers = (categories) => {
  const [state, setState] = useState({
    category: [],
    type: '',
    medium: '',
  });

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

  return {
    state,
    showCategories,
    showTypes,
    showMedium,
  };
};

export default createHelpers;
