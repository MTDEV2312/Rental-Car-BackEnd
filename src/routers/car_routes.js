import {Router} from 'express'
import {RegisterCar,GetCar,GetCarById,UpdateCar,DeleteCar} from '../controllers/car_controller.js'

const router = Router()

router.post('/cars/register',RegisterCar)
router.get('/cars',GetCar)
router.get('/cars/:placa',GetCarById)
router.patch('/cars/update/:id',UpdateCar)
router.delete('/cars/delete/:id',DeleteCar)

export default router