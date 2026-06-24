import {Router} from 'express'
import nodeCreator from './user.routes/node.creator.router.js'
import nodeRetriever from './user.routes/node.retiever.router.js'
import nodeDeleter from './user.routes/delete.node.router.js'
import nodeUpdater from './user.routes/node.updater.router.js'

const router = Router()

router.use('/data/create', nodeCreator)
router.use('/data/read', nodeRetriever)
router.use('/data/delete', nodeDeleter)
router.use('/data/update', nodeUpdater)

export default router
