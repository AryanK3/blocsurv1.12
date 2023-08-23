import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("users");
    const body = JSON.parse(req.body);
    const collection=db.collection("profiles");
    const dat = await collection.findOne({ mail: body.mail });    
    res.json({ "data": dat });
}