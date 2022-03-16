import prisma from '../../lib/prisma';
import { s3 } from '../../lib/s3Client';

export default async (req, res) => {
  const { method, body } = req;

  switch (method) {
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
    default:
      console.log('You hit the wrong endpoint');
      break;
  }
};

// export default async (req, res) => {
//   const { method, body } = req;
//
//   switch (method) {
//     case 'POST':
//       try {
//         let result = await prisma.category.findFirst({
//           where: { title: body.split('/')[1] },
//         });
//         res.status(200).json({
//           data: { result },
//         });
//       } catch (err) {
//         console.log('errCatch', err);
//       }
//       break;
//     default:
//       res.status(400).json({
//         message: 'You have used the incorrect method',
//       });
//       break;
//   }
// };
