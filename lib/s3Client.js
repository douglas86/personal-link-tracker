import AWS from 'aws-sdk';
import { keys } from './keys';

AWS.config.update({
  accessKeyId: keys.aws.accessKey,
  secretAccessKey: keys.aws.secretKey,
  region: keys.aws.region,
});

export const s3 = new AWS.S3();
