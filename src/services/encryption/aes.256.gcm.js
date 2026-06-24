import crypto from 'crypto'
const ALGORITHM = 'aes-256-gcm'
const IV_LENGTH = 12

//encrypt data with aes256gcm
export const aesGcmEnc = (data,key) => {
    if(!Buffer.isBuffer(key) || key.length !== 32)
    {
        throw new Error("key isn't 32 bytes like it should")
    }
    const iv = crypto.randomBytes(IV_LENGTH)
    const cipher = crypto.createCipheriv(ALGORITHM,key,iv)
    let cipheredText = cipher.update(data,'utf8','hex')
    const authTag = cipher.getAuthTag()
    return {
        cipheredText : cipheredText,
        iv : iv.toString('hex'),
        authTag : authTag.toString('hex')
    }
}

