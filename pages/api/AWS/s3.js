import AWS from 'aws-sdk';
import fs from 'fs';
import { PrismaClient } from '@prisma/client';
import { CreateCategory, Params } from './helpers/s3helpers';

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

            const params = Params(body.name, type, base64Data);

            let location = ''; // url of s3 bucket object stored
            let key = ''; // name of s3 bucket object stored
            try {
                const { Location, Key } = await s3.upload(params).promise();
                location = Location;
                key = Key;
            } catch (error) {
                console.log(error);
            }

            // Create category in db
            CreateCategory({ body }, location);

            res.status(200).json({
                message: 'Content has been saved to db',
                error: '',
            });

            break;
        default:
            res.status(400).json({
                message: '',
                error: 'There was an error saving content to db',
            });
    }
}
