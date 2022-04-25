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

  return (
    <div>
      <h4>This is for updating the link</h4>
      <div className={styles.flexbox}>
        <div className={styles.leftSide}>
          <p>This is the left</p>
          <p>Categories:</p>
          {data !== undefined
            ? data.data.map((item, index) => (
                <div key={index}>
                  <input
                    type="checkbox"
                    checked={categoryNames.includes(`${item.title}`)}
                    onChange={handleToggle(item.title)}
                  />{' '}
                  <label>{item.title}</label>
                </div>
              ))
            : null}
        </div>
        <div className={styles.rightSide}>
          <p>This is the right side</p>
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
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Update;
