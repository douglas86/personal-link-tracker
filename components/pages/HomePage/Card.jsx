import { useContext, useEffect, useState } from 'react';
import { Container, Alert } from 'react-bootstrap';
import useSWR from 'swr';
import moment from 'moment';

import { HomeContext } from '../PageContext/HomeContext';
import styles from './styles/Card.module.css';

const Card = () => {
  const context = useContext(HomeContext);
  const { state, categoryData } = context;
  const { categoryTitle, image } = state;
  const { description } = categoryData;
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

  // Posts categoryTitle to category api route
  // api route then sends back data from db of categoryTitle
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

  console.log('categoryData', categoryData);
  console.log('arr', arr);

  return (
    <div>
      <Container>
        <div className={styles.flex_container}>
          <div className={styles.flex_left}>
            <h1 className="display-4 font-weight-bold">
              {categoryTitle} - URL/Links
            </h1>
            <Alert variant="secondary">{description}</Alert>
            {arr.map((item, index) => (
              <Alert key={index} variant="info">
                <p style={{ float: 'right' }}>
                  {moment(item.createdAt).fromNow()} by {item.userName}
                </p>
                <h3>{item.title}</h3>
                <p className={styles.url}>{item.url}</p>
                <div className={styles.flex_container}>
                  <p className={styles.p}>{item.medium}</p>
                  <ul className={styles.ul}>
                    {item.categoryNames.map((element, ind) => (
                      <li key={ind} className={styles.li}>
                        {ind}
                      </li>
                    ))}
                  </ul>
                </div>
              </Alert>
            ))}
            <button>load more button</button>
          </div>
          <div className={styles.flex_right}>
            <img src={`data:image/jpeg;base64,${image}`} alt="title" />
            <h4>Most popular in {categoryTitle}</h4>
            <p>show popular links</p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Card;
