import { MongoClient } from 'mongodb';
import { SECRET_MONGODB_USER, SECRET_MONGODB_PASS } from '$env/static/private';

export async function ConnectToDB() {
	const uri = `mongodb+srv://${SECRET_MONGODB_USER}:${SECRET_MONGODB_PASS}@cluster0.cz6zwpy.mongodb.net`;
	const client = new MongoClient(uri);
	await client.connect();
	return client;
}

export async function CloseConnectionToDB(client) {
	try {
		await client.close();
	} catch {
		console.error('Failed to close client');
	}
}
