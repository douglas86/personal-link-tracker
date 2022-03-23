import prisma from '../../lib/prisma';
import { s3 } from '../../lib/s3Client';
import { keys } from '../../lib/keys';

const Links = (props) => {
  const prop = JSON.parse(props.data);
  console.log('prop', prop);
  return (
    <div>
      <h1>This is links</h1>
    </div>
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
