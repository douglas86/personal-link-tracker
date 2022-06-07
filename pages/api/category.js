import { Get, Post, Put, Delete } from '../../Helper/api/categoryHelper';

const Handler = async (req, res) => {
    const { method, body } = req;

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
            // TODO: comment out this code
            // TODO: get the id of body first
            // TODO: then re-right code in controllers and services manner

            try {
                console.log('body', body);
                res.json({
                    status: 200,
                    message: 'You have successfully deleted from db',
                });
            } catch (err) {
                res.json({
                    status: 400,
                    message: 'Something went wrong',
                });
            }

            // try {
            //     Delete(body, res);
            // } catch (err) {
            //     res.json({
            //         status: 400,
            //         message: 'Something went wrong',
            //     });
            // }
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
