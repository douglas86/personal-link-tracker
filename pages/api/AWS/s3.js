// import AWS from 'aws-sdk';

// const s3 = new AWS.s3({
//     region: process.env.NEXT_PUBLIC_AWS_REGION,
//     accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_KEY,
// });

export default async function handler(req, res) {
    const { method, body } = req;

    switch (method) {
        case 'POST':
            console.log('body', body);
            res.send('Message received');
            break;
        default:
            console.log('nothing was sent');
    }
}
