import { json } from '@sveltejs/kit';
import { ConnectToDB, CloseConnectionToDB } from '$lib/server/db.js';
import { ObjectId } from 'mongodb';
//console.log('Get list reached');

export async function GET({ params }) {
	try {
		const { id } = params;
		//console.log('page ID: ' + id);

		let gotEssay;
		// Get last essay
		if (id == 'latest') {
			gotEssay = await GetLatestEssay();
		}
		// get essay by ID
		else if (id != undefined) {
			gotEssay = await GetEssayByID(id);
		}
		// Get default essay
		else {
			console.log('Invalid essay');
		}

		// Return
		return json(gotEssay);
	} catch (error) {
		console.error('Failed to connect to get the list from the server:', error);
	}
}

async function GetEssayByID(id) {
	// Standard connect
	const client = await ConnectToDB();

	// * Do the actual logic
	const database = client.db('potterquiz');
	const essays = database.collection('essays');

	const query = { _id: new ObjectId(id) };
	const essay = await essays.findOne(query);
	const nextEssays = await essays
		.find({ _id: { $gt: essay._id } })
		.limit(1)
		.toArray();
	const nextEssay = nextEssays[0];
	if (nextEssay) {
		essay.next = nextEssay.title;
		essay.next_id = nextEssay._id;
	} else {
		essay.next = '';
	}
	// TODO look into if we can use a reverse sorting to make this get the first one behind rather than starting from the first of all essays
	const previousEssays = await essays.find({ _id: { $lt: essay._id } }).toArray();
	const prevEssay = previousEssays[previousEssays.length - 1]; // Need to get the last one as it starts from the beginning.
	if (prevEssay) {
		essay.prev = prevEssay.title;
		essay.prev_id = prevEssay._id;
	} else {
		essay.prev = '';
	}

	// Standard close
	await CloseConnectionToDB(client);

	return essay;
}

async function GetLatestEssay() {
	// Standard connect
	const client = await ConnectToDB();

	// * Do the actual logic
	const database = client.db('potterquiz');
	const essays = database.collection('essays');

	const essayArray = await essays.find().toArray();

	const essay = essayArray[essayArray.length - 1]; // Get the last item in the list.

	// There is no next essay, so just make this empty.
	essay.next = '';

	// TODO look into if we can use a reverse sorting to make this get the first one behind rather than starting from the first of all essays
	const previousEssays = await essays.find({ _id: { $lt: essay._id } }).toArray();
	const prevEssay = previousEssays[previousEssays.length - 1]; // Need to get the last one as it starts from the beginning.
	if (prevEssay) {
		essay.prev = prevEssay.title;
		essay.prev_id = prevEssay._id;
	} else {
		essay.prev = '';
	}

	// Standard close
	await CloseConnectionToDB(client);

	return essay;
}
