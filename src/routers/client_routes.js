import {Router} from 'express'
import {RegisterClient,GetClients,GetClientById,UpdateClient,DeleteClient} from '../controllers/client_controller.js'
import {verifyJwt} from '../middlewares/jwt.js'
import {validateRequest} from '../middlewares/middleware_validation.js'
import {RegisterClientValidator,GetClientByIdValidator,UpdateClientValidator,DeleteClientValidator} from '../helpers/client_validator.js'

const router = Router()

router.post('/clients/register',verifyJwt,RegisterClientValidator,validateRequest,RegisterClient)
router.get('/clients',verifyJwt,GetClients)
router.get('/clients/:cedula',verifyJwt,GetClientByIdValidator,validateRequest,GetClientById)
router.patch('/clients/update/:id',verifyJwt,UpdateClientValidator,validateRequest,UpdateClient)
router.delete('/clients/delete/:id',verifyJwt,DeleteClientValidator,validateRequest,DeleteClient)

export default router