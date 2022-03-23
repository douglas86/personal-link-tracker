import prisma from '../../lib/prisma';
import { s3 } from '../../lib/s3Client';
import { keys } from '../../lib/keys';
import { Get, Post, Put } from '../../Helper/api/categoryHelper';

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
    // update;
    case 'PUT':
      try {
        Put(body, res);
      } catch (err) {
        res.json({
          status: 400,
          message: 'Something went wrong',
        });
      }
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
