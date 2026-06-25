import fs from "fs"
import crypto from "crypto"
import {MongoConnection} from "../DAL/dal.js"

export const ValidateInput = (req,res, next) => {
    return (!req.body && req.method !== "GET" && req.method !== "DELETE") ?
    res.status(400).send("Unable To Continue, The Required Parameters Has Not Been Sent By The User"):
    next();
}

export const CheckIfUserHasID = (req,res, next) => {
    let userID = req.cookies?.userID;
    if(!userID){
        userID = crypto.randomUUID();
        res.cookie("userID", userID, { httpOnly: true, maxAge: 900000 });
    }
    req.userID = userID;
    next();
}

export const InitEnvEncryption = (req, res, next) => {
    if(!process.env.MASTER_SALT || !process.env.MASTER_PASSWORD)
    {
        const password = crypto.randomBytes(32).toString("base64");
        const salt = crypto.randomBytes(16).toString("hex");
        const envVals = `MASTER_SALT = "${salt}"\nMASTER_PASSWORD = "${password}"\n`;
        fs.writeFileSync(".env", envVals, {flag: "a" });
    }
    next();
}


export const CheckIfNodeIDExists = async (req,res, next) => {
    try{
        const {NodeID} = req.params;
        const dbResponse = await MongoConnection("nodes").getNodeByID(NodeID);
        if(!dbResponse){
            throw new Error("couldnt fetch the node");
        }
        next();
    }
    catch(err){
        console.log("caught an exception -> ",  err);
        throw err;
    }
}


//de funcs <- the best comment of the century
//generates the public and private keys
export const genKeys = (seed) => {
    if (!Buffer.isBuffer(seed) || seed.length !== 32)
    {
        throw new Error("seed size isn't 32 bytes");
    }
    const ED25519_PKCS8_HEADER = Buffer.from('302e020100300506032b657004220420', 'hex');
    const derBuffer = Buffer.concat([ED25519_PKCS8_HEADER, seed]);
    const privateKey = crypto.createPrivateKey({
        key: derBuffer,
        format: 'der',
        type: 'pkcs8'
    });
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