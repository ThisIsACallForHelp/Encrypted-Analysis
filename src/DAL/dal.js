import { MongoClient } from "mongodb";

export const MongoConnection = (collectionName) =>{ //an object
    const url = process.env.MONGODB_URL;
    const monClient = new MongoClient(url);
    const databaseName = "Secret-Vault";
    const db = monClient.db(databaseName);
    const collection = db.collection(collectionName);

    return {
        createNewSecretNode: async (NodeInfo) => {
            
        },
        deleteNodeFromDB: async (NodeID) => {
            try{
                const result = await collection.deleteOne({NodeID: NodeID});
                return result;
            }
            catch(err){
                console.log("couldnt delete node, caught an exception -> ", err.message);
                throw err;
            }
        },
        updateNodeInDB: async (NodeID) => {

        },
        getNodeByID: async (NodeID) => {
            try{
                const result = await collection.findOne(NodeID);
                return result;
            }
            catch(err){
                console.log("couldnt get the node by the id, caught an exception -> ", err.message);
                throw error;
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
