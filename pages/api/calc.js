import clientPromise from '../../lib/mongodb';

const dbName = 'form1';
const collectionName = 'c1';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const client = await clientPromise;
      const db = client.db(dbName);

      const collection = db.collection(collectionName);
      const result = await collection.findOne({}, { projection: { a: 1, _id: 0 } });

      if (result) {
        const amount = result.a;
        console.log('Amount:', amount);
        res.status(200).json({ amount });
      } 
    } catch (error) {
      console.error('Error retrieving data from the collection:', error);
      res.status(500).json({ error: 'An error occurred while retrieving data from the collection' });
    }
  } 
}
