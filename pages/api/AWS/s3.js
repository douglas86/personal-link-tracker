import AWS from 'aws-sdk';
import fs from 'fs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const { method, body } = req;

    const {
        NEXT_PUBLIC_AWS_REGION,
        NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
        NEXT_PUBLIC_AWS_SECRET_KEY,
    } = process.env;

    AWS.config.setPromisesDependency(require('bluebird'));
    AWS.config.update({
        accessKeyId: NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
        secretAccessKey: NEXT_PUBLIC_AWS_SECRET_KEY,
        region: NEXT_PUBLIC_AWS_REGION,
    });

    const s3 = new AWS.S3();

    switch (method) {
        case 'POST':
            const base64Data = new Buffer.from(
                body.image.replace(/^data:image\/\w+;base64,/, ''),
                'base64'
            );

            const type = body.image.split(';')[0].split('/')[1];

            const s3name = body.name;

            const params = {
                Bucket: 'hackr-douglas2',
                Key: `${s3name}.${type}`, // type is not required
                Body: base64Data,
                ACL: 'public-read',
                ContentEncoding: 'base64', // required
                ContentType: `image/${type}`, // required. Notice the back ticks
            };

            let location = '';
            let key = '';
            try {
                const { Location, Key } = await s3.upload(params).promise();
                location = Location;
                key = Key;
            } catch (error) {
                console.log(error);
            }

            console.log(location, key);

            const createCategory = await prisma.category.create({
                data: {
                    name: body.name,
                    description: body.description,
                    image: location,
                },
            });

            return location;

            break;
        default:
            console.log('nothing was sent');
    }
}
