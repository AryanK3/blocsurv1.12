import clientPromise from "../../lib/mongodb";
export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("formupload");
    const db3 = client.db("formsearch");
    const data = req.body;
    const c3=db3.collection("formsearch");
    c3.insertOne(data);
    await db.collection(data.id).insertOne(data);
    const db2 = client.db("users");
    const collection2=db2.collection("profiles");
    const email = data['name']
    await collection2.updateOne({ mail: email },{ $inc: { survmade: 1 } });
    await collection2.updateOne({ mail: email },{ $push: { created: data.id } });    
    res.json({ "fact": "JOE MAMA" })
}