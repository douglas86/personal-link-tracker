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

// update;
export const Put = async (body, res) => {
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
};

// delete
export const Delete = async (body, res) => {
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
};
