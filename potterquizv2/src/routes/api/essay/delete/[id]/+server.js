import { json } from '@sveltejs/kit';
import { ConnectToDB, CloseConnectionToDB } from '$lib/server/db.js';
import { ObjectId } from 'mongodb';

export async function DELETE({ params }) {
	const id = params.id;

	console.log('Delete starting for: ' + id);

	// Connect and delete
	const client = await ConnectToDB();

	// Delete
	// * Do the actual logic
	const database = client.db('potterquiz');
	const essays = database.collection('essays');

	const query = { _id: new ObjectId(id) };
	const result = await essays.deleteOne(query);

	await CloseConnectionToDB(client);

	console.log('Delete completed for: ' + id);

	if (result.deletedCount === 1) {
		console.log('Delete successful');
		return new Response(null, { status: 204 });
	} else {
		console.log('Delete failed');
		return new Response(null, { status: 404 });
	}
}
