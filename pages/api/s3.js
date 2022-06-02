import { keys } from '../../lib/keys';
import { s3 } from '../../lib/s3Client';
import { GetController } from './controllers/s3Controllers';

const Handler = async (req, res) => {
    const { method, query } = req;

    switch (method) {
        case 'GET':
            const { s3BucketKey } = query;
            GetController(res, s3BucketKey);
            break;
        default:
            break;
    }
};

export default Handler;
