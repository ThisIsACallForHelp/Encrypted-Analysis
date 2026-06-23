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
        }
    }
}
