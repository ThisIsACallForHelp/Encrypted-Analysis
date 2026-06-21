//the router that router the user to the correct request type routers
import {Router} from 'express'
import dataHandler from './user.routes/data.handler.router.js'
import userHandler from './user.routes/user.handler.router.js'
const router = Router()
router.use('/data', dataHandler)
router.use('/input', userHandler)
export default router
