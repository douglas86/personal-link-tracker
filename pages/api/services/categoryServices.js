import prisma from '../../../lib/prisma';
import { s3 } from '../../../lib/s3Client';
import { keys } from '../../../lib/keys';

const goParams = (title) => {
    return {
        Bucket: keys.aws.s3Bucket,
        Key: `category/${title}.jpeg`,
    };
};

export const deleteServices = async ({ id, title }, res) => {
    await prisma.category.delete({ where: { id } }).then(() => {
        s3.deleteObject(goParams(title), (err) => {
            if (err) {
                res.json({
                    status: 400,
                    message: err.message,
                });
            } else {
                res.json({
                    status: 200,
                    message: 'All objects have successfully been deleted',
                });
            }
        });
    });
};
