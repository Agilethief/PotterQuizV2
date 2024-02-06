import { json } from '@sveltejs/kit';
import { ConnectToDB, CloseConnectionToDB } from '$lib/server/db.js';
import { ObjectId } from 'mongodb';

export async function POST({ request }) {
	try {
		const data = await request.json();
		const essayID = data.id;
		const updatedEssayTitle = '' + data.title; // Force it to be a string
		const updatedEssayBody = JSON.stringify(data.content);
		const displayContent = data.displayContent;
		// Standard connect
		const client = await ConnectToDB();

		// * Do the actual logic
		const database = client.db('potterquiz');
		const essays = database.collection('essays');

		console.log(`Updating essay: ${updatedEssayTitle}`);

		const result = await essays.updateOne(
			{ _id: new ObjectId(essayID) },
			{
				$set: {
					title: updatedEssayTitle,
					content: updatedEssayBody,
					updatedDate: new Date(),
					displayContent: displayContent
				}
			}
		);

		// Standard close
		await CloseConnectionToDB(client);

		// Return
		return json({
			status: 201,
			id: essayID
		});
	} catch (error) {
		console.error('Failed updating essay:', error);
	}
}
