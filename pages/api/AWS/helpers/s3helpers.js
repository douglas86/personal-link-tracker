import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const Params = (name, type, base64String) => {
    return {
        Bucket: process.env.NEXT_PUBLIC_S3BUCKET_NAME,
        Key: `${name}.${type}`, // type is not required
        Body: base64String,
        ACL: 'public-read',
        ContentEncoding: 'base64', // required
        ContentType: `image/${type}`, // required. Notice the back ticks
    };
};

export const CreateCategory = async ({ body }, key, location) => {
    const { name, description } = body;
    return await prisma.category.create({
        data: {
            name,
            description,
            s3BucketKey: key,
            image: location,
        },
    });
};
