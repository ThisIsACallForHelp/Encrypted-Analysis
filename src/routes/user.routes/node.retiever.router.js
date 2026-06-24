import {GetServerData} from "../../controller/user.controller.js"
import {CheckIfNodeIDExists} from "../../utils/data.validator.js"
import {Router} from 'express'


const router = Router()

router.get("/:NodeID", (req,res) => {
    return GetServerData(req,res);
})
export default router