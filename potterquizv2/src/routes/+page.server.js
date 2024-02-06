import { SECRET_MONGODB_USER, SECRET_MONGODB_PASS } from '$env/static/private';
import { MongoClient } from 'mongodb';
// https://www.mongodb.com/docs/drivers/node/current/usage-examples/findOne/

const uri = `mongodb+srv://${SECRET_MONGODB_USER}:${SECRET_MONGODB_PASS}@cluster0.cz6zwpy.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

export async function load() {
	try {
		await client.connect();
		console.log('Database connected');

		//await ExampleGetAndCreate();

		await client.close();
	} catch (error) {
		console.error('Failed to connect to the database:', error);
	}
}

async function ExampleGetAndCreate() {
	const database = client.db('potterquiz');
	const essays = database.collection('essays');

	const query = { title: 'a new essay' };

	const essay = await essays.findOne(query);
	if (essay !== null) console.log(essay);
	else {
		console.log('could not find essay, inserting instead');
		// Inserting
		const newEssay = {
			title: 'a new essay',
			content: 'This has been created and inserted',
			createdDate: new Date('2024-01-26T14:00:00.000Z'),
			updatedDate: new Date('2024-01-26T14:00:00.000Z')
		};

		await essays.insertOne(newEssay);
		console.log('Essay inserted');
	}
}
