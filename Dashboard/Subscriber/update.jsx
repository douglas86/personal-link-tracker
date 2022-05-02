import { useContext } from 'react';
import { Button } from 'react-bootstrap';
import useSWR from 'swr';

import styles from './styles/update.module.css';
import { SubscriberContext } from '../../Context/Dashboard/Subscriber/SubscriberContext.jsx';
import Read from './read.jsx';

const Update = () => {
  const context = useContext(SubscriberContext);
  const { state, setState, setLoadComponent } = context;
  const { id, title, url, medium, type, categoryNames } = state;

  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data } = useSWR('/api/category', fetcher);

  const handleToggle = (c) => () => {
    const all = [...categoryNames];
    const clickedCategory = categoryNames.indexOf(c);
    if (clickedCategory === -1) {
      all.push(c);
    } else {
      all.splice(clickedCategory, 1);
    }
    setState({ ...state, categoryNames: all });
  };

  console.log('state', state);
  console.log('data', data);

  const showCategories = () => {
    return (
      <>
        <p style={{ marginBottom: '-5px' }}>Category</p>
        {data !== undefined
          ? categoryNames.map((item, index) => (
              <li className="list-unstyled" key={index}>
                <input
                  type="checkbox"
                  name={item}
                  className="mr-2"
                  checked={categoryNames.includes(`${item}`)}
                  onChange={handleToggle(item)}
                />{' '}
                <label className="form-check-label">{item}</label>
              </li>
            ))
          : null}
      </>
    );
  };

  const showTypes = () => (
    <>
      <p style={{ marginBottom: '-5px' }}>Type</p>
      <div className="form-check ml-3">
        <label className="form-check-label">
          <input
            type="radio"
            value={type}
            className="form-check-input"
            checked={type === 'Free'}
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
            value={type}
            className="form-check-input"
            checked={type === 'Paid'}
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
      <p style={{ marginBottom: '-5px' }}>Medium</p>
      <div className="form-check ml-3">
        <label className="form-check-label">
          <input
            type="radio"
            className="form-check-input"
            checked={medium === 'Video'}
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
            className="form-check-input"
            checked={medium === 'Book'}
            onChange={() => setState({ ...state, medium: 'Book' })}
            name="medium"
          />{' '}
          Book
        </label>
      </div>
    </>
  );

  return (
    <div>
      <h4>Updating: {title}</h4>
      <div className={styles.flexbox}>
        <div className={styles.leftSide}>
          {showCategories()}
          {showTypes()}
          {showMedium()}
        </div>
        <div className={styles.rightSide}>
          <label>Title</label>
          <br />
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setState({
                ...state,
                title: e.target.value,
              });
            }}
          />
          <br />
          <label>Url</label>
          <br />
          <input
            type="text"
            value={url}
            onChange={(e) => {
              setState({
                ...state,
                url: e.target.value,
              });
            }}
          />
          <br />
          <Button
            className={styles.button}
            onClick={() => setLoadComponent(<Read />)}
            variant="warning"
          >
            Update
          </Button>
          <Button
            className={styles.button}
            onClick={() => setLoadComponent(<Read />)}
            variant="warning"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Update;
