import {createHash} from "crypto"

//using SHA512 for extra security
//what we must feed SHA512 is the hash of the last node and a payload
//the payload contains metadata to help and protect the chain
//the data includes:
// user's ipaddress, timestamp, an action (the action that the user wants to perform, like "create", "update" and so on)
//user's ID, resourceID (uuid), status (success, fail and so on) and the sender's ip 
//the hash digests everything and spits out the hex string we need
export const SHA512 = async (payload, lastHash = null) => {
    const prevHash = lastHash || "0".repeat(128);
    const hashOptions = {
        timestamp: new Date.toISOString,
        previousHash: prevHash,
        action: payload.action,
        userID: payload.userID,
        resourceID: payload.resourceID,
        status: payload.status,
        ipAddress: payload.ipAddress
    };
    return createHash("sha512").update(JSON.stringify(hashOptions)).digest("hex");
}