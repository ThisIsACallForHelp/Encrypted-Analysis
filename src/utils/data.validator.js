import fs from "fs"
import crypto from "crypto"
import {MongoConnection} from "../DAL/dal.js"

export const ValidateInput = (req,res, next) => {
    return (!req.body && req.method !== "GET" && req.method !== "DELETE") ?
    res.status(400).send("Unable To Continue, The Required Parameters Has Not Been Sent By The User"):
    next();
}

export const InitEnvEncryption = (req, res, next) => {
    if(!req.session.userID){
        req.session.userID = crypto.randomUUID();
    }
    if(!process.env.MASTER_SALT || !process.env.MASTER_PASSWORD)
    {
        const password = crypto.randomBytes(32).toString("base64");
        const salt = crypto.randomBytes(16).toString("hex");
        const envVals = `MASTER_SALT = "${salt}"\nMASTER_PASSWORD = "${password}"\n`;
        fs.writeFileSync(".env", envVals, {flag: "a" });
    }
    next();
}


export const CheckIfNodeIDExists = (NodeID) => {
    try{
        const dbResponse = MongoConnection("nodes").getNodeByID(NodeID);
        return (dbResponse) ? true : false
    }
    catch{
        return false;
    }
}

//de funcs <- the best comment of the century
//generates the public and private keys
export const genKeys = (seed) => {
    if (!Buffer.isBuffer(seed) || seed.length !== 32)
    {
        throw new Error("seed size isn't 32 bytes");
    }
    const privateKey = crypto.createPrivateKey({
        key:seed,
        format:'raw',
        type:'ed25519'
    })
    const publicKey = crypto.createPublicKey(privateKey)
    return {
        privateKey: privateKey.export({type: 'pkcs8', format: 'pem'}),
        publicKey: publicKey.export({type: 'spki', format: 'pem'})
    }
}
//encrypts the data
export const signBlockLedger = (data,privKey) => {
    if(!data || !privKey)
    {
        throw new Error("missing args (data/key)")
    }
    const signature = crypto.sign(null,Buffer.from(data),privKey)
    return signature.toString('hex')
}
//checks the new data
export const verifyBlockLedger = (data, signatureHex, pubKey) => {
    if(!data || !signatureHex || !pubKey)
    {
        throw new Error('missing data');
    }
    const signature = Buffer.from(signatureHex,'hex')
    return crypto.verify(null,Buffer.from(data),pubKey,signature)
}
