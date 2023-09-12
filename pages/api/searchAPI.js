import clientPromise from '../../lib/mongodb';

export default async function handler(req,res){
    const client = await clientPromise;
    const db3 = client.db("formsearch");
    const c3=db3.collection("formsearch");
    const data=JSON.parse(req.body);
    let pipeline=[
        {
          '$search': {
            'index': 'default', 
            'text': {
              'query': data['arg'], 
              'path': {
                'wildcard': '*'
              }, 
            }
          }
        }
      ];
    const cur=c3.aggregate(pipeline);
    const result=[]
    for await(const x of cur){
        result.push(x)
    }
    res.json(result);
}