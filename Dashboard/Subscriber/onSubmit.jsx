import { useContext } from 'react';
import axios from 'axios';

import { SubscriberContext } from '../../Context/Dashboard/Subscriber/SubscriberContext.jsx';

const onSubmit = () => {
  const context = useContext(SubscriberContext);
  const { allLinks, setAllLinks, skip, setSkip } = context;

  const loadMore = async () => {
    let toSkip = skip + 3;
    const response = await axios.post('/api/pagination', {
      skip: toSkip,
      slug: 'none',
    });
    setAllLinks([...allLinks, ...response.data.data]);
    setSkip(toSkip);
  };

  const handleDelete = async (id) => {
    let answer = window.confirm('Are you sure you want to delete');
    if (answer) {
      await axios.delete('/api/link', { data: { id } }).then(() => {
        window.location.reload();
      });
    }
  };

  return {
    loadMore,
    handleDelete,
  };
};

export default onSubmit;
