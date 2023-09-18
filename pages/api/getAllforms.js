import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("formsearch");
    const collection = db.collection("formsearch");
    const forms = await collection.find({}).toArray();
    res.json(forms);            
}
