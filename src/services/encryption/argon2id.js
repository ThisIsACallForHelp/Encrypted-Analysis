import  argon2  from "argon2"
//a quick explanation of the file's purpose 
//so what this file does is generate a master key
//we generate a master key to encrypt a one time key
//that we will generate in the aes.256.gcm.js file
export const GenerateMasterKey = async (password, randomSalt) => {
    const cryptoInfo = {
        type: argon2.argon2id, 
        memoryCost: 65536, //memory cost, 64 MB 
        timeCost: 4, 
        parallelism: 2, 
        hashLength: 32, 
        salt: randomSalt, 
        raw: true 
    };

    const masterKey = await argon2.hash(password, cryptoInfo);
    return masterKey; 
}