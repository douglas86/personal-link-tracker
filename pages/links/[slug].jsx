import prisma from '../../lib/prisma';
import { s3 } from '../../lib/s3Client';
import { keys } from '../../lib/keys';

import styles from '../../public/static/styles/[slug].module.css';
import { Container } from 'react-bootstrap';

const Links = (props) => {
  const prop = JSON.parse(props.data);
  console.log('prop', prop);
  return (
    <Container>
      <div className={styles.flex_container}>
        <div className={styles.flex_left}>
          <h1>This is the left</h1>
        </div>
        <div className={styles.flex_right}>
          <h1>This is the right</h1>
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
    props: { data: JSON.stringify(data) },
  };
};

export default Links;
