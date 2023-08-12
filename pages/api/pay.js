import clientPromise from '../../lib/mongodb';
import { ethers } from "ethers";
async function getData(req){
  const body=req.body;
  const client=await clientPromise;
  const db=client.db("formupload");
  const collection=db.collection(body['formid']);
  const data=await collection.find({}).toArray();
  const newAValue = data[0]['a'] * data[0]['r'];
  const newPValue = data[0]['p'] + 1;
  await collection.updateOne({}, { $set: { a: newAValue, p: newPValue } });
  const resp=client.db("responses");
  const respc=resp.collection(body['formid']);
  await respc.insertOne(body);
  const provider = new ethers.AlchemyProvider('sepolia', 'zfLkf49x6uCpGUh6J_of7j1DvxZXMoHz');
  const predefinedPrivateKey = '74bc64ba057d9af6a3a845e188f72ec572b003eca5493f492a22d6b8d3936e8b';
  const predefinedAccount = new ethers.Wallet(predefinedPrivateKey, provider);
  const metamaskAccount = body['meta'];
  const amount= data[0]['a'];
  const transaction = {
    to: metamaskAccount,
    value: ethers.parseEther(amount.toString()), 
  };

  const signedTransaction = await predefinedAccount.sendTransaction(transaction);
  console.log('Transaction sent:', signedTransaction);
  
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
          resolve(); // in case something goes wrong in the catch block (as vijay commented)
        });
    });
}
