//routes to the controller/s that is/are handling the user
import { Router } from "express"
import  { CreateNewData }  from "../../controller/user.controller.js" 
import { ValidateInput } from "../../utils/data.validator.js"
const router = Router();


router.get("/:Data", ValidateInput ,(req,res) => {
    return CreateNewData(req,res);
});

export default router;
