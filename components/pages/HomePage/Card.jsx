import { useContext, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import useSWR from 'swr';

import { HomeContext } from '../PageContext/HomeContext';

const Card = () => {
  const context = useContext(HomeContext);
  const [d, setD] = useState({});
  const { categoryTitle, image } = context.state;
  let arr = [];

  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data } = useSWR('/api/link', fetcher);

  // Filters all data from s3 bucket
  // pushes data from s3 bucket to arr based on categoryTitle
  data !== undefined
    ? Object.entries(data.data).map(([k, v]) => {
        return v.categoryNames.filter((i) => {
          if (i === categoryTitle) {
            arr.push(v);
          }
        });
      })
    : null;

  useEffect(() => {
    fetch('/api/category', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(categoryTitle),
    })
      .then(async (res) => {
        const result = await res.json();
        context.setCategoryData(result.data.result);
      })
      .catch((err) => console.log('err', err));
  }, [categoryTitle]);

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
