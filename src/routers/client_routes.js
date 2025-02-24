import {Router} from 'express'
import {RegisterClient,GetClients,GetClientById,UpdateClient,DeleteClient} from '../controllers/client_controller.js'
import {verifyJwt} from '../middlewares/jwt.js'

const router = Router()

router.post('/clients/register',verifyJwt,RegisterClient)
router.get('/clients',verifyJwt,GetClients)
router.get('/clients/:cedula',verifyJwt,GetClientById)
router.patch('/clients/update/:id',verifyJwt,UpdateClient)
router.delete('/clients/delete/:id',verifyJwt,DeleteClient)

export default router