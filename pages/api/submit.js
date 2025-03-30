import AWS from 'aws-sdk';

AWS.config.update({
    region: process.env.MY_AWS_REGION || 'ap-northeast-2',
    credentials: new AWS.EnvironmentCredentials('AWS') // 🔥 핵심 줄
});

const ddb = new AWS.DynamoDB.DocumentClient();

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