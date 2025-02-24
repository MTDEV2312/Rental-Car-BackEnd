import {Router} from 'express'
import {RegisterCar,GetCar,GetCarById,UpdateCar,DeleteCar} from '../controllers/car_controller.js'
import {verifyJwt} from '../middlewares/jwt.js'

const router = Router()

router.post('/cars/register',verifyJwt,RegisterCar)
router.get('/cars',verifyJwt,GetCar)
router.get('/cars/:placa',verifyJwt,GetCarById)
router.patch('/cars/update/:id',verifyJwt,UpdateCar)
router.delete('/cars/delete/:id',verifyJwt,DeleteCar)

export default router