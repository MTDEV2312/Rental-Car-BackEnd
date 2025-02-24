import {Router} from 'express'
import {RegisterClient,GetClients,GetClientById,UpdateClient,DeleteClient} from '../controllers/client_controller.js'

const router = Router()

router.post('/clients/register',RegisterClient)
router.get('/clients',GetClients)
router.get('/clients/:cedula',GetClientById)
router.patch('/clients/update/:id',UpdateClient)
router.delete('/clients/delete/:id',DeleteClient)

export default router