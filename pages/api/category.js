import { Get, Post, Put, Delete } from '../../Helper/api/categoryHelper';
import prisma from '../../lib/prisma';
import { s3 } from '../../lib/s3Client';
import { keys } from '../../lib/keys';

const goParams = (title) => {
    return {
        Bucket: keys.aws.s3Bucket,
        Key: `category/${title}.jpeg`,
    };
};

const Handler = async (req, res) => {
    const { method, body } = req;
    const { id, title } = body;

    switch (method) {
        // create
        case 'POST':
            Post(body)
                .then(() => {
                    res.json({
                        status: 200,
                        message: 'Data has been successfully saved to db',
                    });
                })
                .catch((err) => {
                    res.json({
                        status: 400,
                        message: `An error has occurred ${err}`,
                    });
                });
            break;
        // read;
        case 'GET':
            try {
                Get(res);
            } catch (err) {
                res.json({
                    status: 400,
                    message: err.message,
                });
            }
            break;
        // update;
        case 'PUT':
            try {
                Put(body, res);
            } catch (err) {
                res.json({
                    status: 400,
                    message: 'Something went wrong',
                });
            }
            break;
        // delete
        case 'DELETE':
            // TODO: import prisma from lib

            try {
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
                                message:
                                    'All objects have successfully been deleted',
                            });
                        }
                    });
                });
            } catch (err) {
                res.json({
                    status: 400,
                    message: 'Something went wrong',
                });
            }

            break;
        default:
            res.json({
                status: 404,
                message: 'Something went wrong',
            });
            break;
    }
};

export default Handler;
