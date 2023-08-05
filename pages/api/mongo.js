import clientPromise from "../../lib/mongodb";
export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("formupload");
    const data = req.body;
    await db.collection(data.id).insertOne(data);
    res.json({ "fact": "JOE MAMA" })
}