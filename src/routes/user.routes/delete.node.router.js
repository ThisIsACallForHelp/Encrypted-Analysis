import { Router } from "express";
import  { DeleteDataFromServer }  from "../../controller/user.controller.js" 
import { ValidateInput } from "../../utils/data.validator.js"

const router = Router();

router.delete("/:NodeID", ValidateInput, DeleteDataFromServer)

export default router;