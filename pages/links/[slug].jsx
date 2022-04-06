import renderHTML from 'react-render-html';
import useSWR from 'swr';
import { Container, Alert } from 'react-bootstrap';

import prisma from '../../lib/prisma';
import { s3 } from '../../lib/s3Client';
import { keys } from '../../lib/keys';

import styles from '../../public/static/styles/[slug].module.css';

const Links = (props) => {
  const prop = JSON.parse(props.data);
  const links = JSON.parse(props.links);

  console.log('links', links);

  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data } = useSWR('/api/link', fetcher);

  return (
    <Container>
      <div className={styles.flex_container}>
        <div className={styles.flex_left}>
          <h1 className="display-4 font-weight-bold">
            {prop.title} - URL/Links
          </h1>
          <div className="lead alert alert-secondary pt-4">
            {renderHTML(prop.description || '')}
          </div>
          {data
            ? Object.entries(data.data).map(([key, value]) => (
                <div key={key}>
                  <Alert variant="primary">
                    <Alert.Heading>{value.title}</Alert.Heading>
                    <p>{value.url}</p>
                    <div className={styles.alert_bottom_flex}>
                      <>
                        {value.medium === 'Book' ? (
                          <p className={styles.alert_p}>Book</p>
                        ) : (
                          <p>Book/</p>
                        )}
                        {value.medium === 'Video' ? (
                          <p className={styles.alert_p}>Video</p>
                        ) : (
                          <p>/Video</p>
                        )}
                        {value.type === 'Free' ? (
                          <p
                            style={{ marginLeft: '10px' }}
                            className={styles.alert_p}
                          >
                            Free
                          </p>
                        ) : (
                          <p style={{ marginLeft: '10px' }}>Free/</p>
                        )}
                        {value.type === 'Paid' ? (
                          <p className={styles.alert_p}>Paid</p>
                        ) : (
                          <p>/Paid</p>
                        )}
                        <p style={{ marginLeft: '10%' }}>
                          Created by {value.userName}
                        </p>
                      </>
                    </div>
                  </Alert>
                </div>
              ))
            : null}
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

  const Links = await prisma.links.findMany({
    where: {
      categoryNames: {
        has: slug,
      },
    },
    take: 3,
  });

  console.log('Links', Links);

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
    props: { data: JSON.stringify(data), links: JSON.stringify(Links) },
  };
};

export default Links;
