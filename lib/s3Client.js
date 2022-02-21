import AWS from 'aws-sdk';
import { S3Client } from '@aws-sdk/client-s3';

const {
    NEXT_PUBLIC_AWS_REGION,
    NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    NEXT_PUBLIC_AWS_SECRET_KEY,
} = process.env;

AWS.config.update({
    accessKeyId: NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: NEXT_PUBLIC_AWS_SECRET_KEY,
    region: NEXT_PUBLIC_AWS_REGION,
});

export const s3 = new AWS.S3();
