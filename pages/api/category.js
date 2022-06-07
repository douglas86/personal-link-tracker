import { Get, Post, Put } from '../../Helper/api/categoryHelper';

import { deleteController } from './controllers/categoryControllers';

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
            try {
                deleteController(body, res);
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
