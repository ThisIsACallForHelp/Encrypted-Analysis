import {MongoClient} from "mongodb";

<<<<<<< HEAD
export const MongoConnection = (collectionName) =>{ //an object
=======
let monClient;

export const MongoConnection = async (collectionName) =>{
>>>>>>> 435f56415436fba1f4164f3a5191f091b4bda037
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
            const {nodeId, userId, encData, dataIv, dataAuthTag, encDek, dekIv, dekAuthTag, creationTime} = NodeInfo;
            return await collection.insertOne({
                NodeID:nodeId,
                userId:userId,
                encryptedData:encData,
                dataIV:dataIv,
                dataAuthTag:dataAuthTag,
                encryptedDEK:encDek,
                dekIV:dekIv,
                dekAuthTag:dekAuthTag,
                createdAt:creationTime});
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
            const {nodeId, userId, encData, dataIv, dataAuthTag, encDek, dekIv, dekAuthTag, creationTime} = NodeInfo;
            return await collection.updateOne({NodeID:NodeID}, {$set: {
                NodeID:nodeId,
                userId:userId,
                encryptedData:encData,
                dataIV:dataIv,
                dataAuthTag:dataAuthTag,
                encryptedDEK:encDek,
                dekIV:dekIv,
                dekAuthTag:dekAuthTag,
                createdAt:creationTime}});
        },
        getNodeByID: async (NodeID) => {
<<<<<<< HEAD
            try{
                const result = await collection.findOne(NodeID);
=======
            try
            {
                const result = await collection.findOne({NodeID:NodeID});
>>>>>>> 435f56415436fba1f4164f3a5191f091b4bda037
                return result;
            }
            catch(err)
            {
                console.log("couldnt get the node by the id, caught an exception -> ", err.message);
                throw err;
            }
        },
        getLastestNodeHash: async (userID) => {
            try{
                const query = (userID) ? {userID: userID} : {};
                const YoungestNode = await collection.findOne(query, {sort: 
                    {timestamp: -1}
                });
                if(!YoungestNode){
                    throw error;
                }
                return YoungestNode.hash;
            }
            catch{
                console.log("problem with finding the latest node");
                throw error;
            }
        }
    }
}
