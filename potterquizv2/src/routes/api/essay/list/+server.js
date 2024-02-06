import { json } from '@sveltejs/kit';
import { ConnectToDB, CloseConnectionToDB } from '$lib/server/db.js';

//console.log('Get list reached');

export async function GET() {
	try {
		// Standard connect
		const client = await ConnectToDB();

		// * Do the actual logic
		const database = client.db('potterquiz');
		const essays = database.collection('essays');

		const essaysList = await essays.find().toArray();

		// Standard close
		await CloseConnectionToDB(client);

		// Return
		return json(essaysList);
	} catch (error) {
		console.error('Failed to connect to get the list from the server:', error);
	}
}
