import { useContext, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import useSWR from 'swr';

import { HomeContext } from '../PageContext/HomeContext';

const Card = () => {
  const context = useContext(HomeContext);
  const { categoryTitle } = context.state;
  console.log('context', context);

  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data } = useSWR('/api/link', fetcher);

  console.log('data', data);

  return (
    <div>
      <Container>
        <h1 className="display-4 font-weight-bold">
          {categoryTitle} - URL/Links
        </h1>
      </Container>
    </div>
  );
};

export default Card;
