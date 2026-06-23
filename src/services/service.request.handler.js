import {MongoConnection} from "../DAL/dal.js"
import { GenerateMasterKey } from "./encryption/argon2id.js";
import {aesGcmEnc} from "./encryption/aes.256.gcm.js"
import { EdSig } from "./encryption/ed25519.js";
import { SHA512 } from "./encryption/sha512.js";
import { randomBytes } from "crypto"
import { randomUUID } from "crypto";
import { UUID } from "bson";
export const Service = {
    DeleteDataService: async (NodeID) => {
        const NodeDB = MongoConnection("Nodes");
        return await NodeDB.deleteNodeFromDB(NodeID);
    },
    GetDataService: async (NodeID) => {
        const NodeDB = MongoConnection("Nodes");
        return await NodeDB.getNodeByID(NodeID);
    },
    CreateDataService: async (data) => {
        const userID = "";
        const NodeID = randomUUID();
        const prevHash = await MongoConnection("Nodes").getLastestNodeHash || "0".repeat(128);
        const hashSecret = {
            action: "CREATE",
            userID: userID,
            resourceID: NodeID,
            status: "SUCCESS",
            ipAddress: "127.0.0.1"
        };
        const HashedData = await SHA512(hashSecret, prevHash)
        const [salt, password] = [process.env.MASTER_SALT, process.env.MASTER_PASSWORD];
        const masterKey = GenerateMasterKey(password, salt);
        const ephemeralKey = randomBytes(32);
        const {cipheredText, iv, authTag}  = aesGcmEnc(data, ephemeralKey);
        const encryptedKey = aesGcmEnc(ephemeralKey, masterKey);
        const dbPayload = {
            NodeID: NodeID,
            userID: userID,
            encryptedData: cipheredText,
            dataIV: iv,
            dataAuthTag: authTag,
            encryptedDEK: encryptedKey.cipheredText,
            encryptedIV: encryptedKey.iv,
            encryptedAuthTag: encryptedKey.authTag,
            timestamp: new Date(),
            hashPayload: HashedData
        };

    }
}