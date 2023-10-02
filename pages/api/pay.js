import clientPromise from '../../lib/mongodb';
import { ethers } from "ethers";

async function getData(req){
  const body=req.body;

  const email = body['email'];
  const formId = body['formid'];
  const client = await clientPromise;
  const db2=client.db("users");
  const collection2=db2.collection("profiles");
  const userDocument = await collection2.findOne({ mail: email });
  console.log(userDocument,"USER DOC")
  if (userDocument!=null) {
    if(userDocument.taken.includes(formId)){return {message : "You have already done a submission."}; }
  } 

  const db=client.db("formsearch");
  const collection=db.collection("formsearch");
  const data = await collection.findOne({id: formId});
  console.log(data)
  const newPValue = data['p'] + 1;
  const resp=client.db("responses");
  if (!(await resp.listCollections({ name: formId }).hasNext())) {
      await resp.createCollection(formId);
  }
  const respc=resp.collection(formId);
  await respc.insertOne(body);

  await collection2.updateOne({ mail: email },{ $inc: { survtaken: 1 } });    
  await collection2.updateOne({ mail: email },{ $push: { taken: formId } });    

  const amount = data['a'].toFixed(18);
  if (amount >= Math.pow(10, -18)) {
    const newAValue = data['a'] * data['r'];
    await collection.updateOne({id: formId}, { $set: { a: newAValue, p: newPValue } });
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
    return {message : "Transaction successful!", Transaction_Hash: signedTransaction};      
  } else{
    const newAValue=0;
    await collection.updateOne({ id: formId }, { $set: { a: newAValue, p: newPValue } });    
    console.log('No more form payout left');
    return {message : "No more form payout left"};  
  }
}
export default async function handler(req, res) {
    console.log(await getData(req))
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
    /*let result=await getData(req);
    return res.status(200).json({"data" : JSON.stringify(result)});*/
}
