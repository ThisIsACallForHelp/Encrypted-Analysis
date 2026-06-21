export const ValidateInput = (req,res, next) => {
    return (!req.body && req.method !== "GET" && req.method !== "DELETE") ?
    res.status(400).send("Unable To Continue, The Required Parameters Has Not Been Sent By The User"):
    next();
}