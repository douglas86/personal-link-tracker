import { useState } from 'react';
import renderHTML from 'react-render-html';
import useSWR from 'swr';
import { Container, Alert } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroller';
import axios from 'axios';
import { useRouter } from 'next/router';

import Pagination from '../../components/pagination.jsx';
import prisma from '../../lib/prisma';
import { s3 } from '../../lib/s3Client';
import { keys } from '../../lib/keys';

import styles from '../../public/static/styles/[slug].module.css';

const Links = (props) => {
  const prop = JSON.parse(props.data);
  const links = JSON.parse(props.links);
  const leng = JSON.parse(props.leng).length;

  console.log('links', links);

  const router = useRouter();
  const { slug } = router.query;

  const [skip, setSkip] = useState(0);
  const [link, setLink] = useState(links);

  const loadMore = async () => {
    let toSkip = skip + 3;
    const response = await axios.post('/api/pagination', {
      skip: toSkip,
      slug,
    });
    setLink([...link, ...response.data.data]);
    setSkip(toSkip);
  };

  const listOfLinks = () =>
    link.map((item, index) => (
      <div key={index}>
        <Alert variant="primary">
          <Alert.Heading>{item.title}</Alert.Heading>
          <p>{item.url}</p>
          <div className={styles.alert_bottom_flex}>
            <>
              {item.medium === 'Book' ? (
                <p className={styles.alert_p}>Book</p>
              ) : (
                <p>Book/</p>
              )}
              {item.medium === 'Video' ? (
                <p className={styles.alert_p}>Video</p>
              ) : (
                <p>/Video</p>
              )}
              {item.type === 'Free' ? (
                <p style={{ marginLeft: '10px' }} className={styles.alert_p}>
                  Free
                </p>
              ) : (
                <p style={{ marginLeft: '10px' }}>Free/</p>
              )}
              {item.type === 'Paid' ? (
                <p className={styles.alert_p}>Paid</p>
              ) : (
                <p>/Paid</p>
              )}
              <p style={{ marginLeft: '10%' }}>Created by {item.userName}</p>
            </>
          </div>
        </Alert>
      </div>
    ));

  console.log('links', links);

  return (
    <Container>
      <Pagination endpoint="/api/data" user="false" links={links} />
      <div className={styles.flex_container}>
        <div className={styles.flex_left}>
          <h1 className="display-4 font-weight-bold">
            {prop.title} - URL/Links
          </h1>
          <div className="lead alert alert-secondary pt-4">
            {renderHTML(prop.description || '')}
          </div>
          <InfiniteScroll
            pageStart={0}
            loadMore={loadMore}
            hasMore={skip <= leng}
            loader={<h4 key={0}>Loading...</h4>}
          >
            {listOfLinks()}
          </InfiniteScroll>
        </div>
        <div className={styles.flex_right}>
          <img
            src={`data:image/jpeg;base64,${prop.image}`}
            alt="image"
            width={400}
            height={200}
          />
          <div className={styles.popular_links}>
            <h2 className="lead">Most popular in {prop.title}</h2>
            <p>show popular links</p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export const getServerSideProps = async ({ query }) => {
  const { slug } = query;

  const Prisma = await prisma.category.findFirst({
    where: {
      title: slug,
    },
  });

  const Length = await prisma.links.findMany({
    where: {
      categoryNames: {
        has: slug,
      },
    },
  });

  const Links = await prisma.links.findMany({
    where: {
      categoryNames: {
        has: slug,
      },
    },
    take: 2,
  });

  const { title, description, s3BucketKey } = Prisma;

  const params = {
    Bucket: keys.aws.s3Bucket,
    Key: s3BucketKey,
  };

  const S3 = await s3
    .getObject(params)
    .promise()
    .then((res) => {
      return res;
    });

  const data = {
    title,
    description,
    image: S3.Body.toString('base64'),
  };

  return {
    props: {
      data: JSON.stringify(data),
      links: JSON.stringify(Links),
      leng: JSON.stringify(Length),
    },
  };
};

export default Links;
