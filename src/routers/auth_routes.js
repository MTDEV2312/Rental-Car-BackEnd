import {Router} from 'express'
import {Login} from '../controllers/auth_controller.js'
import {validateRequest} from '../middlewares/middleware_validation.js'
import loginValidator from '../helpers/auth_validation.js'

const router = Router()

router.post('/login',loginValidator,validateRequest,Login)

export default router