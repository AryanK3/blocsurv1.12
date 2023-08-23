import clientPromise from '../../lib/mongodb';
import { ethers } from "ethers";
async function getData(req){
  const body=req.body;
  const client=await clientPromise;
  const db=client.db("formupload");
  const collection=db.collection(body['formid']);
  const data=await collection.find({}).toArray();
  const newPValue = data[0]['p'] + 1;
  const resp=client.db("responses");
  const collectionName = body['formid'];
  if (!(await db.listCollections({ name: collectionName }).hasNext())) {
      await db.createCollection(collectionName);
  }
  const respc=resp.collection(collectionName);
  await respc.insertOne(body);

  const db2=client.db("users");
  const collection2=db2.collection("profiles");
  const email = body['email']
  await collection2.updateOne({ mail: email },{ $inc: { survtaken: 1 } });    

  const amount = data[0]['a'].toFixed(18);
  if (amount >= Math.pow(10, -18)) {
    const newAValue = data[0]['a'] * data[0]['r'];
    await collection.updateOne({}, { $set: { a: newAValue, p: newPValue } });
    const provider = new ethers.AlchemyProvider('sepolia', 'zfLkf49x6uCpGUh6J_of7j1DvxZXMoHz');
    const predefinedPrivateKey = '74bc64ba057d9af6a3a845e188f72ec572b003eca5493f492a22d6b8d3936e8b';
    const predefinedAccount = new ethers.Wallet(predefinedPrivateKey, provider);
    const metamaskAccount = body['meta'];
    const transaction = {
      to: metamaskAccount,
      value: ethers.parseEther(amount.toString()), 
      };
    const signedTransaction = await predefinedAccount.sendTransaction(transaction);
    console.log('Transaction sent:', signedTransaction); 
    await collection2.updateOne({ mail: email }, { $inc: { amtearned: parseFloat(amount) } });    
  } else{
    const newAValue=0;
    await collection.updateOne({}, { $set: { a: newAValue, p: newPValue } });
    console.log('Amount reached 0. No further transactions.');
  }
}
export default function handler(req, res) {
    
    return new Promise((resolve, reject) => {
      getData(req)
        .then(response => {
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Cache-Control', 'max-age=180000');
          res.end(JSON.stringify(response));
          resolve();
        })
        .catch(error => {
          res.json(error);
          res.status(405).end();
          resolve(); 
        });
    });
}
