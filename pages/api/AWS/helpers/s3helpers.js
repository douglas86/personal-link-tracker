import { PrismaClient } from '@prisma/client';
import { keys } from '../../../../lib/keys';

const prisma = new PrismaClient();

export const Params = (name, type, base64String) => {
  return {
    Bucket: keys.aws.s3Bucket,
    Key: `category/${name}.${type}`, // type is not required
    Body: base64String,
    ACL: 'public-read',
    ContentEncoding: 'base64', // required
    ContentType: `image/${type}`, // required. Notice the back ticks
  };
};

export const CreateCategory = async (title, description, key, location) => {
  return await prisma.category.create({
    data: {
      title,
      description,
      s3BucketKey: `category/${key}`,
      image: location,
    },
  });
};
