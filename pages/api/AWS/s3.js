import { s3 } from '../../../lib/s3Client';
import { CreateCategory, Params } from './helpers/s3helpers';

export default async function handler(req, res) {
    const { method, body } = req;

    switch (method) {
        case 'POST':
            try {
                const base64Data = new Buffer.from(
                    body.image.replace(/^data:image\/\w+;base64,/, ''),
                    'base64'
                );

                const type = body.image.split(';')[0].split('/')[1];

                const params = Params(body.name, type, base64Data);

                await s3
                    .upload(params)
                    .promise()
                    .then((res) => {
                        CreateCategory({ body }, res.Location);
                    })
                    .catch((err) => console.log('error', err));
                res.status(200).json({
                    success: 'You have successfully saved to the db',
                });
            } catch (error) {
                res.status(400).json({
                    error: 'There was an error saving your data',
                });
            }
            break;
        default:
            console.log('This point was hit');
            break;
    }
}

// import AWS from 'aws-sdk';
// import fs from 'fs';
// import { PrismaClient } from '@prisma/client';
// import { CreateCategory, Params } from './helpers/s3helpers';

// const prisma = new PrismaClient();

// export default async function handler(req, res) {
//     const { method, body } = req;

//     const {
//         NEXT_PUBLIC_AWS_REGION,
//         NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
//         NEXT_PUBLIC_AWS_SECRET_KEY,
//     } = process.env;

//     AWS.config.setPromisesDependency(require('bluebird'));
//     AWS.config.update({
//         accessKeyId: NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
//         secretAccessKey: NEXT_PUBLIC_AWS_SECRET_KEY,
//         region: NEXT_PUBLIC_AWS_REGION,
//     });

//     const s3 = new AWS.S3();

//     switch (method) {
//         case 'POST':
//             try {
//                 const base64Data = new Buffer.from(
//                     body.image.replace(/^data:image\/\w+;base64,/, ''),
//                     'base64'
//                 );

//                 const type = body.image.split(';')[0].split('/')[1];

//                 const params = Params(body.name, type, base64Data);

//                 let location = ''; // url of s3 bucket object stored
//                 let key = ''; // name of s3 bucket object stored
//                 try {
//                     const { Location, Key } = await s3
//                         .upload(params)
//                         .promise()
//                         .then((res) => console.log('res', res))
//                         .catch((err) => console.log('err', err));
//                     location = Location;
//                     key = Key;
//                 } catch (error) {
//                     console.log(error);
//                 }

//                 // Create category in db
//                 CreateCategory({ body }, location);

//                 res.status(200).json({
//                     success: 'Content has been saved to db',
//                 });
//             } catch (error) {
//                 console.log('this was hit');
//                 res.send('Error');
//             }

//             break;
//         default:
//             break;
//     }
// }
