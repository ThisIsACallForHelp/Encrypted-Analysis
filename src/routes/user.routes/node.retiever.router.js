import {GetServerData} from "../../controller/user.controller.js"
import {Router} from 'express'


const router = Router()

router.get("/:NodeID", (req,res) => {
    return await GetServerData(req,res);
})
export default router