const createHelpers = (categories) => {
  const showCategories = () => {
    return (
      <>
        {categories
          ? categories.map((item) => (
              <li className="list-unstyled" key={item.id}>
                <input type="checkbox" name={item.title} className="mr-2" />{' '}
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
            name="type"
          />{' '}
          Paid
        </label>
      </div>
    </>
  );

  return {
    showCategories,
    showTypes,
  };
};

export default createHelpers;
