import {GetServerData} from "../../controller/user.controller.js"
import {Router} from 'express'

const router = Router()

router.get("/:NodeID", GetServerData)
export default router