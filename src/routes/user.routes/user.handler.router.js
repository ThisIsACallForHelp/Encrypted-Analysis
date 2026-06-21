//routes to the controller/s that is/are handling the user
import { Router } from "express"
import  { StoreData }  from "../../controller/user.controller.js" 
import { ValidateInput } from "../../utils/data.validator.js"
const router = Router();


router.get("/:Data", ValidateInput ,(req,res) => {
    return StoreData(req,res);
});