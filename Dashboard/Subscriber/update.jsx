import { useContext } from 'react';
import { Button } from 'react-bootstrap';

import { SubscriberContext } from '../../Context/Dashboard/Subscriber/SubscriberContext.jsx';
import Read from './read.jsx';

const Update = () => {
  const context = useContext(SubscriberContext);
  const { state, setLoadComponent } = context;

  console.log('state', state);

  return (
    <div>
      <h1>This is the update section</h1>
      <Button onClick={() => setLoadComponent(<Read />)} variant="warning">
        Cancel
      </Button>
    </div>
  );
};

export default Update;
