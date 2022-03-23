import { keys } from '../../lib/keys';
import prisma from '../../lib/prisma';
import { s3 } from '../../lib/s3Client';

const base64Data = (image) => {
  return new Buffer.from(
    image.replace(/^data:image\/\w+;base64,/, ''),
    'base64'
  );
};

const type = (image) => {
  return image.split(';')[0].split('/')[1];
};

// create;
export const Post = async (body) => {
  const { title, content, image } = body;

  const params = {
    Bucket: keys.aws.s3Bucket,
    Key: `category/${title}.${type(image)}`,
    Body: base64Data(image),
    ACL: 'public-read',
    ContentEncoding: 'base64',
    ContentType: `image/${type(image)}`,
  };

  await s3
    .upload(params)
    .promise()
    .then(async (resources) => {
      const { Key, Location } = resources;
      await prisma.category.create({
        data: {
          title,
          description: content,
          s3BucketKey: `${Key}`,
          image: Location,
        },
      });
    });
};

// read;
export const Get = async (res) => {
  let contents = [];
  contents.length = 0;

  await prisma.category.findMany().then(async (r) => {
    if (r.length >= contents.length) {
      let promises = r.map(async (item) => {
        const params = {
          Bucket: keys.aws.s3Bucket,
          Key: item.s3BucketKey,
        };
        await s3
          .getObject(params)
          .promise()
          .then((re) => {
            contents.push({
              id: item.id,
              title: item.title,
              description: item.description,
              image: re.Body.toString('base64'),
            });
          });
      });

      Promise.all(promises).then(() => {
        res.json({
          data: contents,
          status: 200,
          message: 'All data retrieved successfully',
        });
      });
    }
  });
};
