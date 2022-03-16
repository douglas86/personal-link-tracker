import prisma from '../../lib/prisma';
import { s3 } from '../../lib/s3Client';

const contents = [];

export default async (req, res) => {
  const { method, body } = req;

  const getObject = async (resources, params) => {
    resources.Contents.map(async (item) => {
      let goParams = {
        Bucket: params.Bucket,
        Key: `${item.Key}`,
      };
      await s3
        .getObject(goParams)
        .promise()
        .then((r) => {
          contents.push({ item: item.Key, image: r.Body.toString('base64') });
          if (resources.Contents.length === contents.length) {
            res.json({
              status: 200,
              contents,
            });
          }
        });
    });
  };

  switch (method) {
    // create
    case 'POST':
      const { name, content, image } = body;
      const base64Data = new Buffer.from(
        image.replace(/^data:image\/\w+;base64,/, ''),
        'base64'
      );
      const type = image.split(';')[0].split('/')[1];
      const params = {
        Bucket: process.env.NEXT_PUBLIC_S3BUCKET_NAME,
        Key: `category/${name}.${type}`,
        Body: base64Data,
        ACL: 'public-read',
        ContentEncoding: 'base64',
        ContentType: `image/${type}`,
      };
      await s3
        .upload(params)
        .promise()
        .then(async (resources) => {
          const { Key, Location } = resources;
          await prisma.category.create({
            data: {
              title: name,
              description: content,
              s3BucketKey: `${Key}`,
              image: Location,
            },
          });
        })
        .then(() => {
          res.json({
            status: 200,
            message: 'Data has been successfully saved to db',
          });
        })
        .catch((err) => {
          res.json({
            status: 400,
            message: `An error has occurred ${err}`,
          });
        });
      break;
    // read;
    case 'GET':
      try {
        const params = {
          Bucket: process.env.NEXT_PUBLIC_S3BUCKET_NAME,
        };
        await s3
          .listObjectsV2(params)
          .promise()
          .then(async (res) => {
            let result = await getObject(res, params);
            return result;
          });
      } catch (err) {
        console.log('err', err);
      }
      break;
    default:
      console.log('You hit the wrong endpoint');
      break;
  }
};
