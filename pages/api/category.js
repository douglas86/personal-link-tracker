import prisma from '../../lib/prisma';
import { s3 } from '../../lib/s3Client';

const contents = [];

export default async (req, res) => {
  const { method, body } = req;

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
        let result = await prisma.category.findMany();
        if (result.length > contents.length) {
          result.map(async (item) => {
            const params = {
              Bucket: process.env.NEXT_PUBLIC_S3BUCKET_NAME,
              Key: item.s3BucketKey,
            };
            await s3
              .getObject(params)
              .promise()
              .then(async (r) => {
                contents.push({
                  id: item.id,
                  title: item.title,
                  image: r.Body.toString('base64'),
                });
              })
              .then(() => {
                res.json({
                  data: contents,
                  status: 200,
                  message: 'All data retrieved successfully',
                });
              })
              .catch(() => {
                res.json({
                  status: 400,
                  message: 'Something went wrong',
                });
              });
          });
        }
      } catch (err) {
        res.json({
          status: 200,
          message: err.message,
        });
      }
      break;
    // delete
    case 'DELETE':
      const goParams = {
        Bucket: process.env.NEXT_PUBLIC_S3BUCKET_NAME,
        Key: `category/${body.title}.jpeg`,
      };

      await prisma.category
        .delete({
          where: { id: body.id },
        })
        .then(async () => {
          await s3.deleteObject(goParams, (err) => {
            if (err) {
              console.log('err', err);
            } else {
              res.json({
                status: 200,
                message: 'All objects have successfully been deleted',
              });
            }
          });
        });
    default:
      res.json({
        status: 404,
        message: 'Something went wrong',
      });
      break;
  }
};
