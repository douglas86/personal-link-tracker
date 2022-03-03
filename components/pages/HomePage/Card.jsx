import { useContext, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import useSWR from 'swr';

import { HomeContext } from '../PageContext/HomeContext';

const Card = () => {
  const context = useContext(HomeContext);
  const { categoryTitle, image } = context.state;
  let arr = [];
  console.log('context', context);

  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data } = useSWR('/api/link', fetcher);

  data !== undefined
    ? Object.entries(data.data).map(([k, v]) => {
        return v.categoryNames.filter((i) => {
          if (i === categoryTitle) {
            arr.push(v);
          }
        });
      })
    : null;

  console.log('arr', arr);

  // function One(docs) {
  //   return docs.categoryNames === categoryTitle;
  // }
  //
  // let d =
  //   data !== undefined
  //     ? data.data.find(
  //         async ({ categoryNames }) => (await categoryNames) === categoryTitle
  //       )
  //     : null;
  //
  // console.log('d', d);

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
