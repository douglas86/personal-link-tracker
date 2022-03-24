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

  return {
    showCategories,
  };
};

export default createHelpers;
