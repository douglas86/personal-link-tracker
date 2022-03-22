import prisma from '../../lib/prisma';
import { s3 } from '../../lib/s3Client';
import { keys } from '../../lib/keys';

let contents = [];

export default async (req, res) => {
  const { method, body } = req;

  switch (method) {
    // create
    case 'POST':
      const { title, content, image } = body;
      const base64Data = new Buffer.from(
        image.replace(/^data:image\/\w+;base64,/, ''),
        'base64'
      );
      const type = image.split(';')[0].split('/')[1];
      const params = {
        Bucket: keys.aws.s3Bucket,
        Key: `category/${title}.${type}`,
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
              title: title,
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
      } catch (err) {
        res.json({
          status: 200,
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
