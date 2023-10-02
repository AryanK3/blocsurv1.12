import { typeOf } from "tls";
import clientPromise from "../../lib/mongodb";

export default async function handler(req,res){
    const client=await clientPromise;
    const formID=JSON.parse(req.body).formUUID;
    const upload=client.db("formsearch")
    const collection=upload.collection("formsearch");
    let data = await collection.findOne({ id: formID });
    let dataa = await collection.findOne({ id: formID });
    let ids=[];
    let labels={};
    let id2lab={};
    for(let i=0;i<data['groups'].length;i++){
        if(data['groups'][i]['type']!="text"){
            ids.push(data['groups'][i]["id"])
            labels[data['groups'][i]["label"]]={};
            id2lab[data['groups'][i]["id"]]=data['groups'][i]["label"];
        }
    }
    const retrieve=client.db("responses");
    data=await retrieve.collection(formID).find({}).toArray();
    for(let i=0;i<data.length;i++){
        for(let j=0;j<ids.length;j++){
            if(typeof data[i][ids[j]]!=typeof []){
                
                if(data[i][ids[j]] in labels[id2lab[ids[j]]]){
                    labels[id2lab[ids[j]]][data[i][ids[j]]]+=1;
                }
                else{
                    labels[id2lab[ids[j]]][data[i][ids[j]]]=1;
                }
            }
            else{
                for(let k=0;k<data[i][ids[j]].length;k++){
                    let option=data[i][ids[j]][k];
                    if(option in labels[id2lab[ids[j]]]){
                        labels[id2lab[ids[j]]][option]+=1;
                    }
                    else{
                        labels[id2lab[ids[j]]][option]=1;
                    }
                }
            }
        }
    }
    res.json({ "data": labels, "email": dataa['name']});
}
