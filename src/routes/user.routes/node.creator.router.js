//routes to the controller/s that is/are handling the user
import { Router } from "express"
<<<<<<< HEAD
import  { CreateNewData }  from "../../controller/user.controller.js" 
=======
import  { StoreData }  from "../../controller/user.controller.js" 
>>>>>>> 169938aa4d4ff6026ba8b609de6e8b24440ca627
import { ValidateInput } from "../../utils/data.validator.js"
const router = Router();


router.get("/:Data", ValidateInput ,(req,res) => {
<<<<<<< HEAD
    return CreateNewData(req,res);
});

export default router;
=======
    return StoreData(req,res);
});
>>>>>>> 169938aa4d4ff6026ba8b609de6e8b24440ca627
