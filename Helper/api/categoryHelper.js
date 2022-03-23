import { keys } from '../../lib/keys';
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

let contents = [];

// create;
export const Post = async (body) => {
  const { title, content, image } = body;
  console.log('type', type(image));

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
