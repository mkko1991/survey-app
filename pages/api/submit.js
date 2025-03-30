import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { PutCommand, DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({
    region: process.env.MY_AWS_REGION || 'ap-northeast-2',
});
const ddbDocClient = DynamoDBDocumentClient.from(client);

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
            await ddbDocClient.send(new PutCommand(params));
            res.status(200).json({ message: 'User saved!' });
        } catch (err) {
            console.error('🔥 DynamoDB error:', err);
            res.status(500).json({ error: 'Failed to save user' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}