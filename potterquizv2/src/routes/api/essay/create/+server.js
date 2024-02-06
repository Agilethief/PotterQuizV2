import { json } from '@sveltejs/kit';
import { ConnectToDB, CloseConnectionToDB } from '$lib/server/db.js';
//console.log('Get list reached');

export async function POST({ request }) {
	try {
		const newEssayTitle = await request.json();
		// Standard connect
		const client = await ConnectToDB();

		// * Do the actual logic
		const database = client.db('potterquiz');
		const essays = database.collection('essays');

		console.log('creating new essay');
		// Inserting
		const newEssay = {
			title: newEssayTitle.title,
			content:
				'In the corridors of your mind, a nascent essay awaits, yearning to be etched upon this page.',
			createdDate: new Date(),
			updatedDate: new Date()
		};

		const result = await essays.insertOne(newEssay);

		// Standard close
		await CloseConnectionToDB(client);

		// Return
		return json({
			status: 201,
			id: result.insertedId
		});
		//return new Response({"newID": result.insertedId}, { status: 201 });
	} catch (error) {
		console.error('Failed create a new essay:', error);
	}
}
