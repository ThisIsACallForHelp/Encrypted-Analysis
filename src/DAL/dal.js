import {MongoClient} from "mongodb";

let monClient;

export const MongoConnection = async (collectionName) =>{
    const url = process.env.MONGODB_URL;
    if(!monClient)
    {
            monClient = new MongoClient(url);
            await monClient.connect();
            console.log("connected to mongo db")
    }
    const databaseName = "Secret-Vault";
    const db = monClient.db(databaseName);
    const collection = db.collection(collectionName);
    
    return {
        createNewSecretNode: async (NodeInfo) => {
            try{
                const {nodeId, userId, encData, dataIv, dataAuthTag, encDek, dekIv, dekAuthTag, hash, signature, creationTime} = NodeInfo;
                return await collection.insertOne({
                    NodeID:nodeId,
                    userId:userId,
                    encryptedData:encData,
                    dataIV:dataIv,
                    dataAuthTag:dataAuthTag,
                    encryptedDEK:encDek,
                    dekIV:dekIv,
                    dekAuthTag:dekAuthTag,
                    Hash:hash,
                    Signature:signature,
                    timestamp:creationTime});
            }
            catch(err){
                console.log("caught an error -> ",err);
                throw err;
            }
        },
        deleteNodeFromDB: async (NodeID) => {
            try
            {
                const result = await collection.deleteOne({NodeID: NodeID});
                return result;
            }
            catch(err)
            {
                console.log("couldnt delete node, caught an exception -> ", err.message);
                throw err;
            }
        },
        updateNodeInDB: async (NodeID, NodeInfo) => {
            try{
                const {nodeId, userId, encData, dataIv, dataAuthTag, encDek, dekIv, dekAuthTag, hash, signature, creationTime} = NodeInfo;
                return await collection.updateOne({NodeID:NodeID}, {$set: {
                    NodeID:nodeId,
                    userId:userId,
                    encryptedData:encData,
                    dataIV:dataIv,
                    dataAuthTag:dataAuthTag,
                    encryptedDEK:encDek,
                    dekIV:dekIv,
                    dekAuthTag:dekAuthTag,
                    Hash:hash,
                    Signature:signature,
                    timestamp:creationTime
                }});
            }
            catch(err){
                console.log("caught an error -> ", err);
                throw err;
            }
        },
        getNodeByID: async (NodeID) => {
            try
            {
                const result = await collection.findOne({NodeID:NodeID});
                return result;
            }
            catch(err)
            {
                console.log("couldnt get the node by the id, caught an exception -> ", err.message);
                throw err;
            }
        },
        getLastNodeHash: async (userID) =>{
            try{
                const last = await collection.findOne({userID: userID},{sort:{timestamp:-1}})
                if(!last){
                    return null
                }
                return last;
            }
            catch(err)
            {
                console.log("caught an error -> ", err);
                throw err;
            }
        },
        getClosestNode: async (userID, timestamp) => {
            try{
                const previous = await collection.findOne(
                    {
                        userID: userID,
                        timestamp:{ 
                            $lt: timestamp //$lt means less than something
                        }
                    }, 
                    {
                        sort: 
                        {
                            timestamp: -1
                        }
                    }
                );
                if(!previous){
                    throw new Error("didnt find the neighbour node");
                }
                return previous.hash;
            }
            catch(err){
                console.log("caught an exception -> ", err);
                throw err;
            }
        }
    }
}
