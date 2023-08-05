import {MongoClient} from "mongodb";
const uri="mongodb+srv://Aryan:Thor69420@cluster0.qfjzfgj.mongodb.net/?retryWrites=true&w=majority";
const client=new MongoClient(uri)
const clientPromise=client.connect()
export default clientPromise