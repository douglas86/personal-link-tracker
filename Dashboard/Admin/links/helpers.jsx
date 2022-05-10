import { useContext } from 'react';
import { AdminContext } from '../../../Context/Dashboard/Admin/AdminContext';

const helpers = () => {
  const context = useContext(AdminContext);
  const { linksTab, setLinksTab } = context;

  const radioLabel = ['All Links', 'My Links'];

  const handleChange = (e) => {
    setLinksTab({ title: e });
  };

  const radio = () => (
    <>
      {radioLabel.map((item, index) => (
        <div
          key={index}
          style={{ display: 'inline-block', marginRight: '10px' }}
        >
          <input
            type="radio"
            name="radio"
            value={item}
            checked={item === linksTab.title}
            onChange={(e) => handleChange(e.target.value)}
          />{' '}
          <label>{item}</label>
        </div>
      ))}
    </>
  );

  return {
    radio,
  };
};

export default helpers;
