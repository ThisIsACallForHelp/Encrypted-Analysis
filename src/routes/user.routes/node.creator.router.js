//routes to the controller/s that is/are handling the user
import {Router} from "express"
import  {CreateNewData}  from "../../controller/user.controller.js" 
import {ValidateInput} from "../../utils/data.validator.js"
const router = Router();

router.post("/", ValidateInput , CreateNewData)

export default router;
