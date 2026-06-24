import crypto from 'crypto'
import {genKeys, signBlockLedger, verifyBlockLedger} from '../../utils/data.validator.js'
const RAND_BYTES = 32
//init consts
const keys = genKeys(crypto.randomBytes(RAND_BYTES))
const publicKey = keys.publicKey
export const EdSig = {
    edSign:  (data) => {
        const privateKey = keys.privateKey
        return signBlockLedger(data, privateKey);
    },
    //check new data
    edVerify : (data, signatureHex) => {
        return verifyBlockLedger(data, signatureHex, publicKey);
    },
    //returns the public key
    getPublicKey : () => {
        return publicKey;
    }
}
