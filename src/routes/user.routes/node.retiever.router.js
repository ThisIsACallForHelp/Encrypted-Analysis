import {GetServerData} from "../../controller/user.controller.js"
import { CheckIfNodeIDExists } from "../../utils/data.validator.js"
import {Router} from 'express'

const router = Router()

router.get("/:NodeID", CheckIfNodeIDExists,GetServerData)
export default router