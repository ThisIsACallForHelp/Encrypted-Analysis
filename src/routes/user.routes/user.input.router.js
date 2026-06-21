//this is a general sample of how the regular controller should work
import { Router } from "express"
import  { StoreData }  from "../../controller/user.controller.js" 
import { ValidateInput } from "../../utils/data.validator.js"
const router = Router();


router.get("/:Data", ValidateInput ,(req,res) => {
    return StoreData(req,res);
});