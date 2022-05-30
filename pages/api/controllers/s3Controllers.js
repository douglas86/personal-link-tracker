import { keys } from '../../../lib/keys';
import { GetServices } from '../services/s3Services';

export const GetController = (res, s3BucketKey) => {
    const params = {
        Bucket: keys.aws.s3Bucket,
        Key: s3BucketKey,
    };

    GetServices(res, params);
};
