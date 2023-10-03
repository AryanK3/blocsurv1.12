import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("formsearch");
    const body = JSON.parse(req.body);
    const dat = await db.collection("formsearch").findOne({id : body.id});
    res.json({ "data": dat });
}
