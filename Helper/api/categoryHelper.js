import { keys } from '../../lib/keys';
import prisma from '../../lib/prisma';
import { s3 } from '../../lib/s3Client';

const base64Data = (image) => {
    return new Buffer.from(
        image.replace(/^data:image\/\w+;base64,/, ''),
        'base64'
    );
};

const type = (image) => {
    return image.split(';')[0].split('/')[1];
};

const bucketKeyParams = (s3Key) => {
    return {
        Bucket: keys.aws.s3Bucket,
        Key: s3Key,
    };
};

const goParams = (title) => {
    return {
        Bucket: keys.aws.s3Bucket,
        Key: `category/${title}.jpeg`,
    };
};

// create;
export const Post = async (body) => {
    const { title, content, image } = body;

    const params = {
        Bucket: keys.aws.s3Bucket,
        Key: `category/${title}.${type(image)}`,
        Body: base64Data(image),
        ACL: 'public-read',
        ContentEncoding: 'base64',
        ContentType: `image/${type(image)}`,
    };

    await s3
        .upload(params)
        .promise()
        .then(async (resources) => {
            const { Key, Location } = resources;
            await prisma.category.create({
                data: {
                    title,
                    description: content,
                    s3BucketKey: `${Key}`,
                    image: Location,
                },
            });
        });
};

// read;
export const Get = async (res) => {
    let contents = [];
    contents.length = 0;

    await prisma.category.findMany().then(async (r) => {
        if (r.length >= contents.length) {
            let promises = r.map(async (item) => {
                const { s3BucketKey, id, title, description } = item;
                await s3
                    .getObject(bucketKeyParams(s3BucketKey))
                    .promise()
                    .then((re) => {
                        contents.push({
                            id,
                            title,
                            description,
                            image: re.Body.toString('base64'),
                        });
                    });
            });

            Promise.all(promises).then(() => {
                res.json({
                    data: contents,
                    status: 200,
                    message: 'All data retrieved successfully',
                });
            });
        }
    });
};

// update;
export const Put = async (body, res) => {
    await prisma.category
        .update({
            where: { id: body.id },
            data: { title: body.title, description: body.content },
        })
        .then(async () => {
            const params = {
                Bucket: keys.aws.s3Bucket,
                Key: `category/${body.title}.jpeg`,
                Body: base64Data(body.image),
                ACL: 'public-read',
                ContentEncoding: 'base64',
                ContentType: `image/jpeg`,
            };
            s3.deleteObject(goParams(body.title), async (err) => {
                if (err) {
                    console.log('err', err);
                } else {
                    await s3
                        .upload(params)
                        .promise()
                        .then(async (re) => {
                            const { Key, Location } = re;
                            await prisma.category
                                .update({
                                    where: { id: body.id },
                                    data: { s3BucketKey: Key, image: Location },
                                })
                                .then(() => {
                                    res.json({
                                        status: 200,
                                        message: 'Data successfully updated',
                                    });
                                });
                        });
                }
            });
        });
};
