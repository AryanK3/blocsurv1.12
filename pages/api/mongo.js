import clientPromise from "../../lib/mongodb";
export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("formupload");
    const data = req.body;
    await db.collection(data.id).insertOne(data);
    const db2 = client.db("users");
    const collection2=db2.collection("profiles");
    const email = data['name']
    await collection2.updateOne({ mail: email },{ $inc: { survmade: 1 } });
    await collection2.updateOne({ mail: email },{ $push: { created: data.id } });    
    res.json({ "fact": "JOE MAMA" })
}