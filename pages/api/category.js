import prisma from '../../lib/prisma';
import { s3 } from '../../lib/s3Client';
import { keys } from '../../lib/keys';
import { Get, Post } from '../../Helper/api/categoryHelper';

// let contents = [];

export default async (req, res) => {
  const { method, body } = req;

  switch (method) {
    // create
    case 'POST':
      Post(body)
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
        Get(res);
      } catch (err) {
        res.json({
          status: 400,
          message: err.message,
        });
      }
      break;
    case 'PUT':
      await prisma.category
        .update({
          where: { id: body.id },
          data: { title: body.title, description: body.content },
        })
        .then(async () => {
          const goParams = {
            Bucket: keys.aws.s3Bucket,
            Key: `category/${body.title}.jpeg`,
          };

          const base64Data = new Buffer.from(
            body.image.replace(/^data:image\/\w+;base64,/, ''),
            'base64'
          );
          const params = {
            Bucket: keys.aws.s3Bucket,
            Key: `category/${body.title}.jpeg`,
            Body: base64Data,
            ACL: 'public-read',
            ContentEncoding: 'base64',
            ContentType: `image/jpeg`,
          };
          s3.deleteObject(goParams, async (err) => {
            if (err) {
              console.log('err', err);
            } else {
              await s3
                .upload(params)
                .promise()
                .then(async (re) => {
                  const { Key, Location } = re;
                  await prisma.category
                    .update({
                      where: { id: body.id },
                      data: { s3BucketKey: Key, image: Location },
                    })
                    .then(() => {
                      res.json({
                        status: 200,
                        message: 'Data successfully updated',
                      });
                    });
                });
            }
          });
        });
      break;
    // delete
    case 'DELETE':
      const goParams = {
        Bucket: keys.aws.s3Bucket,
        Key: `category/${body.title}.jpeg`,
      };

      await prisma.category
        .delete({
          where: { id: body.id },
        })
        .then(() => {
          s3.deleteObject(goParams, (err) => {
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
      break;
    default:
      res.json({
        status: 404,
        message: 'Something went wrong',
      });
      break;
  }
};
