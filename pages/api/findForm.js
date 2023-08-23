import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("formupload");
    const body = JSON.parse(req.body);
    const collection = body.id;
    const dat = await db.collection(collection).find({}).toArray();
    res.json({ "data": dat });
}