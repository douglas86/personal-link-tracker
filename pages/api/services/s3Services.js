import { s3 } from '../../../lib/s3Client';

export const GetServices = async (res, params) => {
    const S3 = await s3
        .getObject(params)
        .promise()
        .then((res) => {
            return res;
        });

    const data = {
        image: S3.Body.toString('base64'),
    };

    res.json({
        status: 200,
        data: data.image,
    });
};
