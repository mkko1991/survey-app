import AWS from 'aws-sdk';

const ddb = new AWS.DynamoDB.DocumentClient({
    region: process.env.MY_AWS_REGION,
    accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
});

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, phone, data } = req.body;

        const params = {
            TableName: 'mjp',
            Item: {
                email,
                phone,
                data,
            },
        };

        try {
            await ddb.put(params).promise();
            res.status(200).json({ message: 'User saved!' });
        } catch (err) {
            console.error('DynamoDB error:', err);
            res.status(500).json({ error: 'Failed to save user' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}