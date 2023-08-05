import clientPromise from '../../lib/mongodb';

export default async function updateHandler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("form1");
    const collection = db.collection("c1");

    const { a, r, p } = await collection.findOne({}, { projection: { a: 1, r: 1, p:1, _id: 0 } });
    const newAValue = a * r;
    const newPValue = p + 1;
    await collection.updateOne({}, { $set: { a: newAValue, p: newPValue } });
    
    res.status(200).json({ message: 'Values updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the values' });
  }
}
