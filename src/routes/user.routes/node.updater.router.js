import {Router} from "express"
import {UpdateServerData} from "../../controller/user.controller.js" 
import {ValidateInput} from "../../utils/data.validator.js"
const router = Router();

router.put("/:NodeID", ValidateInput , UpdateServerData)

export default router;
